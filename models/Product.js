const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  organisationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', required: true },
  name: { type: String, required: true },
  sku: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true, default: 0 },
  costPrice: { type: Number, required: true, default: 0 },
  sellingPrice: { type: Number, required: true, default: 0 },
  lowStockThreshold: { type: Number }
}, { timestamps: true });

productSchema.index({ organisationId: 1, sku: 1 }, { unique: true });

module.exports = mongoose.model('Product', productSchema);
