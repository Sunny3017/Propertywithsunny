const express = require('express');
const router = express.Router();
const { createLead, getLeads, updateLeadStatus, deleteLead } = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getLeads)
    .post(createLead);

router.route('/:id')
    .put(protect, updateLeadStatus)
    .delete(protect, deleteLead);

module.exports = router;
