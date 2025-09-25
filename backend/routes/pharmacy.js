const express = require('express');
const router = express.Router();
const Medication = require('../models/Medication');

// GET all medications
router.get('/', async (req, res) => {
  try {
    const medications = await Medication.findAll({
      order: [['name', 'ASC']],
    });
    res.json(medications);
  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({ error: 'Failed to fetch medications', message: error.message });
  }
});

// POST create new medication
router.post('/', async (req, res) => {
  try {
    const { name, quantity, unit, status, notes } = req.body;
    const medication = await Medication.create({ name, quantity, unit, status, notes });
    res.status(201).json(medication);
  } catch (error) {
    console.error('Error creating medication:', error);
    res.status(500).json({ error: 'Failed to create medication', message: error.message });
  }
});

module.exports = router;
