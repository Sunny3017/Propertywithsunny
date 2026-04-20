const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const connectDB = require('./config/db');
const User = require('./models/User');
const { initializeWhatsApp } = require('./whatsappService');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize WhatsApp
initializeWhatsApp();

const app = express();

// Logger
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for easier integration with React if needed, or configure it properly
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', limiter);

// Body parser
app.use(express.json());

// Enable CORS
const corsOptions = {
    origin: process.env.CLIENT_URL || '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Initializing Admin User
const initializeAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            console.warn('ADMIN_EMAIL or ADMIN_PASSWORD not set in environment variables');
            return;
        }

        const adminExists = await User.findOne({ email: adminEmail });
        if (!adminExists) {
            await User.create({
                email: adminEmail,
                password: adminPassword
            });
            console.log('Admin user initialized successfully');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error initializing admin user:', error.message);
    }
};

initializeAdmin();

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/leads', require('./routes/leadRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    const frontendPath = path.join(__dirname, '..', 'frontend', 'dist');
    
    // Set static folder
    app.use(express.static(frontendPath));

    // All other routes should serve the frontend index.html
    app.get(/^(?!\/api).+/, (req, res) => {
        const frontendPath = path.join(__dirname, '..', 'frontend', 'dist');
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
