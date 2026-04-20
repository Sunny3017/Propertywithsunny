const Lead = require('../models/Lead');
const Settings = require('../models/Settings');
const axios = require('axios');
const { sendAutomatedMessage } = require('../whatsappService');

const sendWhatsAppMessage = async (lead) => {
    try {
        const settings = await Settings.findOne();
        if (settings && settings.isWhatsAppEnabled) {
            let message = settings.whatsappTemplate;
            message = message.replace('{name}', lead.name);
            message = message.replace('{propertyType}', lead.propertyType);
            message = message.replace('{phone}', lead.phone);
            message = message.replace('{email}', lead.email);

            await sendAutomatedMessage(lead.phone, message);
        }
    } catch (error) {
        console.error('Error sending WhatsApp message:', error.message);
    }
};

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res) => {
    try {
        const { name, phone, email, propertyType, message } = req.body;
        const lead = await Lead.create({ name, phone, email, propertyType, message });
        
        // Trigger automatic WhatsApp message
        sendWhatsAppMessage(lead);

        res.status(201).json(lead);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private/Admin
const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update lead status
// @route   PUT /api/leads/:id
// @access  Private/Admin
const updateLeadStatus = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (lead) {
            lead.status = req.body.status || lead.status;
            const updatedLead = await lead.save();
            res.json(updatedLead);
        } else {
            res.status(404).json({ message: 'Lead not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private/Admin
const deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (lead) {
            await lead.deleteOne();
            res.json({ message: 'Lead removed' });
        } else {
            res.status(404).json({ message: 'Lead not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createLead, getLeads, updateLeadStatus, deleteLead };
