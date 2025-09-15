// routes/doctors.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // assuming your User model is here

// GET all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await User.findAll({
      where: { role: 'doctor' },
      attributes: ['id', 'name', 'email', 'department'] // pick only useful fields
    });

    res.json(doctors);
  } catch (err) {
    console.error('❌ Error fetching doctors:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
