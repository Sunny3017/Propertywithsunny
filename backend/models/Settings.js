const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    whatsappTemplate: {
        type: String,
        default: 'Hello {name}, thank you for inquiring about our {propertyType}. Our consultant will contact you shortly.'
    },
    isWhatsAppEnabled: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema, 'realestate_settings');
