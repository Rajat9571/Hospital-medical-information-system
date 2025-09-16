
// routes/patients.js
const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();
require('dotenv').config();

console.log('🔧 Loading patient routes...');

// Validate environment variables
const REQUIRED_ENV = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
REQUIRED_ENV.forEach(key => {
  if (!process.env[key]) {
    console.error(`❌ Environment variable ${key} is missing!`);
    process.exit(1);
  }
});

// Database connection pool
let pool;
async function initializeDatabase() {
  try {
    console.log('🗄️  Initializing database connection for patients...');
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const connection = await pool.getConnection();
    console.log('✅ Database connected for patients');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS patients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50) NOT NULL,
        dateOfBirth DATE NOT NULL,
        gender ENUM('male','female','other') NOT NULL,
        address TEXT,
        emergencyContact VARCHAR(255),
        bloodType VARCHAR(10),
        allergies TEXT,
        status ENUM('active','inactive','critical') DEFAULT 'active',
        patientType ENUM('consultancy','emergency') DEFAULT 'consultancy',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Patients table ready');

    connection.release();
  } catch (err) {
    console.error('❌ Database initialization failed:', err.message);
    process.exit(1);
  }
}

initializeDatabase();

// Get all patients
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM patients ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('❌ Error fetching patients:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get single patient by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM patients WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Patient not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('❌ Error fetching patient:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

// Add a new patient
router.post('/', async (req, res) => {
  const { name, email, phone, dateOfBirth, gender, address, emergencyContact, bloodType, allergies, status, patientType } = req.body;
  if (!name || !email || !phone || !dateOfBirth || !gender) {
    return res.status(400).json({ error: 'Name, email, phone, date of birth, and gender are required' });
  }

  try {
    const [existing] = await pool.execute('SELECT id FROM patients WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(400).json({ error: 'Patient with this email already exists' });

    const [result] = await pool.execute(`
      INSERT INTO patients 
      (name, email, phone, dateOfBirth, gender, address, emergencyContact, bloodType, allergies, status, patientType) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, email, phone, dateOfBirth, gender, address || null, emergencyContact || null, bloodType || null, allergies || null, status || 'active', patientType || 'consultancy']);

    res.status(201).json({ id: result.insertId, name, email, phone, dateOfBirth, gender, address, emergencyContact, bloodType, allergies, status: status || 'active', patientType: patientType || 'consultancy' });
  } catch (err) {
    console.error('❌ Error adding patient:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update patient
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, dateOfBirth, gender, address, emergencyContact, bloodType, allergies, status, patientType } = req.body;

  try {
    const [existing] = await pool.execute('SELECT id FROM patients WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    await pool.execute(
      `UPDATE patients SET name=?, email=?, phone=?, dateOfBirth=?, gender=?, address=?, emergencyContact=?, bloodType=?, allergies=?, status=?, patientType=? WHERE id=?`,
      [name, email, phone, dateOfBirth, gender, address, emergencyContact, bloodType, allergies, status, patientType, id]
    );

    res.json({ message: 'Patient updated successfully' });
  } catch (err) {
    console.error('❌ Error updating patient:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

console.log('✅ Patient routes loaded');
module.exports = router;
