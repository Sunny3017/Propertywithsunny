import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Configuration constants
const DEFAULT_CONFIG = {
  count: 200,
  colors: [0xaaaaaa, 0xcccccc, 0xffffff],
  ambientColor: 0xffffff,
  ambientIntensity: 1,
  lightIntensity: 200,
  materialParams: {
    metalness: 0.5,
    roughness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.15
  },
  minSize: 0.5,
  maxSize: 1,
  size0: 1,
  gravity: 0.5,
  friction: 0.9975,
  wallBounce: 0.95,
  maxVelocity: 0.15,
  maxX: 5,
  maxY: 5,
  maxZ: 2,
  controlSphere0: false,
  followCursor: true
};

// Physics Engine Class
class BallPhysics {
  constructor(config) {
    this.config = config;
    this.positionData = new Float32Array(3 * config.count).fill(0);
    this.velocityData = new Float32Array(3 * config.count).fill(0);
    this.sizeData = new Float32Array(config.count).fill(1);
    this.center = new THREE.Vector3();
    this.initPositions();
    this.setSizes();
  }

  initPositions() {
    const { config, positionData } = this;
    this.center.toArray(positionData, 0);
    for (let i = 1; i < config.count; i++) {
      const s = 3 * i;
      positionData[s] = THREE.MathUtils.randFloatSpread(2 * config.maxX);
      positionData[s + 1] = THREE.MathUtils.randFloatSpread(2 * config.maxY);
      positionData[s + 2] = THREE.MathUtils.randFloatSpread(2 * config.maxZ);
    }
  }

  setSizes() {
    const { config, sizeData } = this;
    sizeData[0] = config.size0;
    for (let i = 1; i < config.count; i++) {
      sizeData[i] = THREE.MathUtils.randFloat(config.minSize, config.maxSize);
    }
  }

  update(delta) {
    const { config, center, positionData, sizeData, velocityData } = this;
    const tempPos = new THREE.Vector3();
    const tempVel = new THREE.Vector3();
    const otherPos = new THREE.Vector3();
    const otherVel = new THREE.Vector3();
    const diff = new THREE.Vector3();
    const impulse = new THREE.Vector3();

    let startIdx = 0;
    if (config.controlSphere0) {
      startIdx = 1;
      tempPos.fromArray(positionData, 0);
      tempPos.lerp(center, 0.1).toArray(positionData, 0);
      tempVel.set(0, 0, 0).toArray(velocityData, 0);
    }

    for (let i = startIdx; i < config.count; i++) {
      const base = 3 * i;
      tempPos.fromArray(positionData, base);
      tempVel.fromArray(velocityData, base);

      tempVel.y -= delta * config.gravity * sizeData[i];
      tempVel.multiplyScalar(config.friction);
      tempVel.clampLength(0, config.maxVelocity);

      tempPos.add(tempVel);
      tempPos.toArray(positionData, base);
      tempVel.toArray(velocityData, base);
    }

    // Collisions
    for (let i = startIdx; i < config.count; i++) {
      const base = 3 * i;
      tempPos.fromArray(positionData, base);
      tempVel.fromArray(velocityData, base);
      const radius = sizeData[i];

      for (let j = i + 1; j < config.count; j++) {
        const otherBase = 3 * j;
        otherPos.fromArray(positionData, otherBase);
        otherVel.fromArray(velocityData, otherBase);
        const otherRadius = sizeData[j];

        diff.copy(otherPos).sub(tempPos);
        const dist = diff.length();
        const sumRadius = radius + otherRadius;

        if (dist < sumRadius) {
          const overlap = sumRadius - dist;
          impulse.copy(diff).normalize().multiplyScalar(0.5 * overlap);
          
          tempPos.sub(impulse);
          otherPos.add(impulse);

          tempPos.toArray(positionData, base);
          otherPos.toArray(positionData, otherBase);
        }
      }

      // Walls
      if (Math.abs(tempPos.x) + radius > config.maxX) {
        tempPos.x = Math.sign(tempPos.x) * (config.maxX - radius);
        tempVel.x = -tempVel.x * config.wallBounce;
      }
      if (config.gravity === 0) {
        if (Math.abs(tempPos.y) + radius > config.maxY) {
          tempPos.y = Math.sign(tempPos.y) * (config.maxY - radius);
          tempVel.y = -tempVel.y * config.wallBounce;
        }
      } else if (tempPos.y - radius < -config.maxY) {
        tempPos.y = -config.maxY + radius;
        tempVel.y = -tempVel.y * config.wallBounce;
      }

      const maxBoundary = Math.max(config.maxZ, config.maxSize);
      if (Math.abs(tempPos.z) + radius > maxBoundary) {
        tempPos.z = Math.sign(tempPos.z) * (config.maxZ - radius);
        tempVel.z = -tempVel.z * config.wallBounce;
      }

      tempPos.toArray(positionData, base);
      tempVel.toArray(velocityData, base);
    }
  }
}

// Robust Custom Material with Scattering
class ScatteringMaterial extends THREE.MeshPhysicalMaterial {
  constructor(params) {
    super(params);
    this.uniforms = {
      thicknessDistortion: { value: 0.1 },
      thicknessAmbient: { value: 0 },
      thicknessAttenuation: { value: 0.1 },
      thicknessPower: { value: 2 },
      thicknessScale: { value: 10 }
    };
  }

  onBeforeCompile(shader) {
    Object.assign(shader.uniforms, this.uniforms);
    
    // Inject uniforms at the top of the fragment shader
    shader.fragmentShader = `
      uniform float thicknessPower;
      uniform float thicknessScale;
      uniform float thicknessDistortion;
      uniform float thicknessAmbient;
      uniform float thicknessAttenuation;
      ${shader.fragmentShader}
    `;

    // Inject the scattering function
    const scatteringFunction = `
      void RE_Direct_Scattering(const in IncidentLight directLight, const in vec3 geometryNormal, const in vec3 geometryViewDir, inout ReflectedLight reflectedLight) {
        vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
        float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
        vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuseColor.rgb;
        reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
      }
    `;

    shader.fragmentShader = shader.fragmentShader.replace(
      'void main() {',
      `${scatteringFunction}\nvoid main() {`
    );

    // Try to find the RE_Direct call or inject into lights_fragment_begin
    // Note: The exact string for RE_Direct varies between Three.js versions.
    // We'll use a more generic approach by injecting into lights_fragment_begin.
    if (shader.fragmentShader.includes('#include <lights_fragment_begin>')) {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <lights_fragment_begin>',
        `
        #include <lights_fragment_begin>
        // Custom scattering injection
        RE_Direct_Scattering(directLight, geometryNormal, geometryViewDir, reflectedLight);
        `
      );
    }
  }
}

const Ballpit = ({ 
  className = '', 
  followCursor = true,
  count = 100,
  gravity = 0.5,
  friction = 0.9975,
  wallBounce = 0.95,
  colors = [0xffffff, 0xaaaaaa, 0xcccccc],
  ...props 
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const requestRef = useRef();
  const sceneRef = useRef();
  const rendererRef = useRef();
  const cameraRef = useRef();
  const physicsRef = useRef();
  const instancedMeshRef = useRef();
  const mouseRef = useRef(new THREE.Vector2());

  // Config Memoization
  const config = useMemo(() => ({
    ...DEFAULT_CONFIG,
    count,
    gravity,
    friction,
    wallBounce,
    colors,
    followCursor,
    ...props
  }), [count, gravity, friction, wallBounce, colors, followCursor, props]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. WebGL Support Check & Context Loss Handling
    const handleContextLost = (event) => {
      event.preventDefault();
      console.warn('THREE.WebGLRenderer: Context Lost.');
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };

    const handleContextRestored = () => {
      console.log('THREE.WebGLRenderer: Context Restored.');
      // The renderer should automatically try to restore, but we might need to recreate some resources
      // For simplicity, we can just trigger a re-render by resetting state if we had any
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // 2. Initialize Three.js Core
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    
    // Debugging: Monitor shader compilation
    renderer.debug.checkShaderErrors = true;
    rendererRef.current = renderer;

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
    camera.position.set(0, 0, 20);
    cameraRef.current = camera;

    // Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment()).texture;
    scene.environment = envTexture;

    // Physics & Instancing
    const physics = new BallPhysics(config);
    physicsRef.current = physics;

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    
    // Create material with fallback
    let material;
    try {
      material = new ScatteringMaterial({
        envMap: envTexture,
        transparent: true,
        opacity: 0.9,
        ...config.materialParams
      });
    } catch (e) {
      console.warn('ScatteringMaterial failed, falling back to MeshStandardMaterial');
      material = new THREE.MeshStandardMaterial({
        envMap: envTexture,
        metalness: 0.5,
        roughness: 0.2
      });
    }
    
    const mesh = new THREE.InstancedMesh(geometry, material, config.count);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    instancedMeshRef.current = mesh;
    scene.add(mesh);

    // Lights - Improved Setup
    const ambientLight = new THREE.AmbientLight(config.ambientColor, config.ambientIntensity * 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(config.colors[0], config.lightIntensity);
    scene.add(pointLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight2.position.set(-5, -5, 5);
    scene.add(dirLight2);

    // Helper Objects
    const dummy = new THREE.Object3D();
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersection = new THREE.Vector3();
    const clock = new THREE.Clock();

    // 3. Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();

      // Update world bounds for physics
      const vFov = (camera.fov * Math.PI) / 180;
      const height = 2 * Math.tan(vFov / 2) * Math.abs(camera.position.z);
      const width = height * camera.aspect;
      
      physics.config.maxX = width / 2;
      physics.config.maxY = height / 2;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // 4. Mouse Tracking
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // 5. Animation Loop
    const animate = () => {
      if (!rendererRef.current) return;
      requestRef.current = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);

      // Interaction
      if (config.followCursor) {
        raycaster.setFromCamera(mouseRef.current, camera);
        if (raycaster.ray.intersectPlane(plane, intersection)) {
          physics.center.copy(intersection);
          physics.config.controlSphere0 = true;
        }
      }

      physics.update(delta);

      // Update Instances
      for (let i = 0; i < config.count; i++) {
        dummy.position.fromArray(physics.positionData, 3 * i);
        if (i === 0 && !config.followCursor) {
          dummy.scale.setScalar(0);
        } else {
          dummy.scale.setScalar(physics.sizeData[i]);
        }
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        
        if (i === 0) pointLight.position.copy(dummy.position);
      }
      mesh.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Cleanup
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(requestRef.current);
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
      }
      
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(m => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      pmremGenerator.dispose();
      rendererRef.current = null;
    };
  }, [config]);

  return (
    <div ref={containerRef} className={`${className} w-full h-full relative overflow-hidden`}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
};

export default Ballpit;
