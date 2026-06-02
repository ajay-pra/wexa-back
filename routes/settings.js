const express = require('express');
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const settings = await Settings.findOne({ organisationId: req.user.organisationId });
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { organisationId: req.user.organisationId },
      { defaultLowStockThreshold: req.body.defaultLowStockThreshold },
      { new: true, upsert: true }
    );
    res.json(settings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
