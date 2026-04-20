const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const fs = require('fs');
const path = require('path');
const Settings = require('./models/Settings');

let client;
let qrCodeData = '';
let isReady = false;

const initializeWhatsApp = () => {
    const authPath = path.resolve(process.env.WHATSAPP_AUTH_PATH || './whatsapp_auth');
    
    // Ensure auth directory exists
    if (!fs.existsSync(authPath)) {
        fs.mkdirSync(authPath, { recursive: true });
        console.log(`Created WhatsApp auth directory at: ${authPath}`);
    }
    
    console.log('Starting WhatsApp client initialization...');
    client = new Client({
        authStrategy: new LocalAuth({
            dataPath: authPath
        }),
        puppeteer: {
            handleSIGINT: false,
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu',
                '--disable-extensions',
                '--disable-software-rasterizer'
            ],
            executablePath: process.env.CHROME_PATH || (process.platform === 'linux' ? '/usr/bin/google-chrome' : undefined)
        }
    });

    client.on('qr', (qr) => {
        console.log('QR Received - Generating Data URL...');
        qrcode.toDataURL(qr, (err, url) => {
            if (err) {
                console.error('Error generating QR Data URL:', err);
                return;
            }
            qrCodeData = url;
            isReady = false;
            console.log('QR Data URL generated successfully');
        });
    });

    client.on('loading_screen', (percent, message) => {
        console.log('WhatsApp Loading:', percent, message);
    });

    client.on('ready', () => {
        console.log('WhatsApp Client is ready!');
        qrCodeData = '';
        isReady = true;
    });

    client.on('authenticated', () => {
        console.log('WhatsApp Authenticated');
    });

    client.on('auth_failure', (msg) => {
        console.error('WhatsApp Auth Failure', msg);
        isReady = false;
    });

    client.on('disconnected', (reason) => {
        console.log('WhatsApp Disconnected', reason);
        isReady = false;
        qrCodeData = '';
        // Re-initialize after delay
        setTimeout(initializeWhatsApp, 5000);
    });

    console.log('Calling client.initialize()...');
    client.initialize()
        .then(() => console.log('WhatsApp client.initialize() promise resolved'))
        .catch(err => {
            console.error('WhatsApp Init Error:', err);
            // If it fails, try to re-initialize after a while
            setTimeout(initializeWhatsApp, 30000);
        });
};

const getWhatsAppStatus = () => {
    return {
        isReady,
        qrCodeData
    };
};

const sendAutomatedMessage = async (to, message) => {
    if (!isReady || !client) {
        console.error('❌ WhatsApp client not ready. Please scan QR code in Admin Panel.');
        return false;
    }

    try {
        // Robust phone number formatting
        let formattedPhone = to.replace(/\D/g, '');
        
        // Handle Indian numbers
        if (formattedPhone.length === 10) {
            formattedPhone = '91' + formattedPhone;
        } else if (formattedPhone.length === 11 && formattedPhone.startsWith('0')) {
            formattedPhone = '91' + formattedPhone.substring(1);
        } else if (formattedPhone.length === 12 && formattedPhone.startsWith('91')) {
            // Already correct
        } else if (formattedPhone.length > 10 && !formattedPhone.startsWith('91')) {
            // Maybe it has a different country code or extra digits, leave it as is 
            // but ensure it's digits only (already done by replace(/\D/g, ''))
        }
        
        const chatId = `${formattedPhone}@c.us`;
        
        // Check registration with a timeout fallback
        let isRegistered = true;
        try {
            isRegistered = await client.isRegisteredUser(chatId);
        } catch (regErr) {
            console.warn(`⚠️ Could not verify registration for ${formattedPhone}, attempting send anyway.`);
        }

        if (!isRegistered) {
            console.error(`❌ Number ${formattedPhone} is not registered on WhatsApp.`);
            return false;
        }

        await client.sendMessage(chatId, message);
        console.log(`✅ WhatsApp message sent successfully to ${formattedPhone}`);
        return true;
    } catch (error) {
        console.error('❌ Error sending WhatsApp message:', error.message);
        return false;
    }
};

module.exports = {
    initializeWhatsApp,
    getWhatsAppStatus,
    sendAutomatedMessage
};
