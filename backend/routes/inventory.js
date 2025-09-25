const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');

// GET all inventory items
router.get('/', async (req, res) => {
  try {
    const items = await InventoryItem.findAll({ order: [['name', 'ASC']] });
    res.json(items);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST new inventory item
router.post('/', async (req, res) => {
  try {
    const { name, category, quantity, status, notes } = req.body;
    const newItem = await InventoryItem.create({ name, category, quantity, status, notes });
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating inventory item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
