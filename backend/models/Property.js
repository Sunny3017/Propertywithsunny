const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        enum: ['Villa', 'Plot', 'Flat'],
        required: true
    },
    amenities: [{
        type: String
    }],
    images: [{
        url: String,
        public_id: String
    }],
    floorPlan: {
        url: String,
        public_id: String
    },
    sitePlan: {
        url: String,
        public_id: String
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema, 'realestate_properties');
    