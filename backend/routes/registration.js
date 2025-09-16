
const express = require('express');
const bcrypt = require('bcryptjs');
const Registration = require('../models/Registration');
const User = require('../models/User');

const router = express.Router();

// Submit registration request
router.post('/register-request', async (req, res) => {
  try {
    const { email, password, name, role, department, phone } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const registration = await Registration.create({
      email,
      password: hashedPassword,
      name,
      role,
      department,
      phone,
      status: 'pending'
    });

    res.status(201).json({
      message: 'Registration request submitted. Waiting for admin approval.',
      requestId: registration.id
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ error: 'Failed to submit registration request' });
  }
});

// Get pending registrations
router.get('/pending', async (req, res) => {
  try {
    const pending = await Registration.findAll({ where: { status: 'pending' } });
    res.json(pending);
  } catch (error) {
    console.error('❌ Fetch pending registrations error:', error);
    res.status(500).json({ error: 'Failed to fetch pending registrations' });
  }
});

// Approve registration
router.post('/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const registration = await Registration.findByPk(id);
    if (!registration) return res.status(404).json({ success: false, message: 'Registration not found' });

    // Update registration status
    registration.status = 'approved';
    await registration.save();

    // Add to users table without re-hashing
    await User.create({
      email: registration.email,
      password: registration.password, // already hashed
      name: registration.name,
      role: registration.role,
      department: registration.department,
      phone: registration.phone
    }, { hooks: false }); // ⚠️ skip hooks

    res.json({ success: true, message: 'Registration approved and user created' });
  } catch (error) {
    console.error('❌ Approve error:', error);
    res.status(500).json({ success: false, message: 'Failed to approve registration' });
  }
});

// Reject registration
router.post('/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const registration = await Registration.findByPk(id);
    if (!registration) return res.status(404).json({ success: false, message: 'Registration not found' });

    registration.status = 'rejected';
    registration.rejectionReason = reason;
    await registration.save();

    res.json({ success: true, message: 'Registration rejected' });
  } catch (error) {
    console.error('❌ Reject error:', error);
    res.status(500).json({ success: false, message: 'Failed to reject registration' });
  }
});

module.exports = router;
