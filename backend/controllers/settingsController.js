const Settings = require('../models/Settings');
const { getWhatsAppStatus, sendAutomatedMessage } = require('../whatsappService');

// @desc    Get current settings
// @route   GET /api/settings
// @access  Private/Admin
const getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({});
        }
        
        const whatsappStatus = getWhatsAppStatus();
        
        res.json({
            ...settings._doc,
            whatsappStatus
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Test WhatsApp message
// @route   POST /api/settings/test-whatsapp
// @access  Private/Admin
const testWhatsApp = async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            return res.status(400).json({ message: 'Phone number is required' });
        }

        const success = await sendAutomatedMessage(phone, 'This is a test message from PropertyWithSunny WhatsApp Automation.');
        
        if (success) {
            res.json({ message: 'Test message sent successfully!' });
        } else {
            res.status(500).json({ message: 'Failed to send test message. Check backend logs.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (settings) {
            settings.whatsappTemplate = req.body.whatsappTemplate || settings.whatsappTemplate;
            settings.isWhatsAppEnabled = req.body.isWhatsAppEnabled !== undefined ? req.body.isWhatsAppEnabled : settings.isWhatsAppEnabled;
            
            const updatedSettings = await settings.save();
            res.json(updatedSettings);
        } else {
            const newSettings = await Settings.create(req.body);
            res.json(newSettings);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getSettings, updateSettings, testWhatsApp };
