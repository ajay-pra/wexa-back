const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  organisationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', required: true, unique: true },
  defaultLowStockThreshold: { type: Number, required: true, default: 5 }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
