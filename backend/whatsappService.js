const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const Settings = require('./models/Settings');

let client;
let qrCodeData = '';
let isReady = false;

const initializeWhatsApp = () => {
    const authPath = process.env.WHATSAPP_AUTH_PATH || './whatsapp_auth';
    
    client = new Client({
        authStrategy: new LocalAuth({
            dataPath: authPath
        }),
        puppeteer: {
            handleSIGINT: false,
            headless: process.env.NODE_ENV === 'production' ? true : false,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ],
        }
    });

    client.on('qr', (qr) => {
        console.log('QR Received');
        qrcode.toDataURL(qr, (err, url) => {
            qrCodeData = url;
            isReady = false;
        });
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

    client.initialize().catch(err => console.error('WhatsApp Init Error:', err));
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
