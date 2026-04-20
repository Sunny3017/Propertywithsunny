const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        enum: ['Villa', 'Plot', 'Flat'],
        required: true
    },
    message: {
        type: String
    },
    status: {
        type: String,
        enum: ['Interested', 'Not Interested', 'Pending'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema, 'realestate_leads');
