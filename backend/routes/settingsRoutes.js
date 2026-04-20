const express = require('express');
const router = express.Router();
const { getSettings, updateSettings, testWhatsApp } = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getSettings)
    .put(protect, updateSettings);

router.post('/test-whatsapp', protect, testWhatsApp);

module.exports = router;
