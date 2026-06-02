const express = require('express');
const Product = require('../models/Product');
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const organisationId = req.user.organisationId;
    const products = await Product.find({ organisationId });
    const settings = await Settings.findOne({ organisationId });
    
    const defaultThreshold = settings ? settings.defaultLowStockThreshold : 5;

    let totalProducts = products.length;
    let totalQuantity = 0;
    let lowStockItems = [];

    products.forEach(product => {
      totalQuantity += product.quantity;
      const threshold = product.lowStockThreshold !== undefined && product.lowStockThreshold !== null 
        ? product.lowStockThreshold 
        : defaultThreshold;
        
      if (product.quantity <= threshold) {
        lowStockItems.push(product);
      }
    });

    res.json({
      totalProducts,
      totalQuantity,
      lowStockItems
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
