
// routes/auth.js - Updated with admin approval system
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const router = express.Router();
require('dotenv').config(); // Load .env variables

console.log('🔧 Loading auth routes...');

// --- Validate environment variables ---
const REQUIRED_ENV = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET'];
REQUIRED_ENV.forEach(key => {
  if (!process.env[key]) {
    console.error(`❌ Environment variable ${key} is missing!`);
    process.exit(1);
  }
});

// --- Database connection ---
let pool;
async function initializeDatabase() {
  try {
    console.log('🗄️  Initializing database connection...');
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
    console.log('✅ Database connected');

    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role ENUM('admin','doctor','nurse','staff','patient') NOT NULL,
        department VARCHAR(100),
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table ready');

    // Create pending registrations table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS pending_registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role ENUM('admin','doctor','nurse','staff','patient') NOT NULL,
        department VARCHAR(100),
        phone VARCHAR(20),
        status ENUM('pending','approved','rejected') DEFAULT 'pending',
        requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        approved_at TIMESTAMP NULL,
        rejected_at TIMESTAMP NULL,
        rejection_reason TEXT,
        approved_by INT,
        rejected_by INT
      )
    `);
    console.log('✅ Pending registrations table ready');

    connection.release();
  } catch (err) {
    console.error('❌ Database initialization failed:', err.message);
    process.exit(1);
  }
}

// Middleware to verify JWT token and check if user is admin
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await pool.execute('SELECT id, email, name, role, department FROM users WHERE id = ?', [decoded.userId]);
    if (!rows[0]) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = rows[0];
    next();
  } catch (err) {
    console.error('❌ Token error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Initialize DB
initializeDatabase();

// --- Test endpoint ---
router.get('/test', (req, res) => {
  res.json({
    message: 'Auth routes working!',
    env: {
      dbUser: process.env.DB_USER,
      dbHost: process.env.DB_HOST,
      jwtConfigured: !!process.env.JWT_SECRET
    }
  });
});

// --- Initialize demo users ---
router.post('/init-demo-users', async (req, res) => {
  if (!pool) return res.status(500).json({ error: 'Database not ready' });

  const demoUsers = [
    { email: 'admin@gmail.com', password: 'admin123', name: 'Admin User', role: 'admin', department: 'administration' },
    { email: 'doctor@gmail.com', password: '12345678', name: 'Dr. Smith', role: 'doctor', department: 'cardiology' },
    { email: 'nurse@gmail.com', password: 'nurse123', name: 'Nurse Jane', role: 'nurse', department: 'emergency' },
    { email: 'staff@gmail.com', password: 'staff123', name: 'Staff Member', role: 'staff', department: 'general' }
  ];

  let created = 0, existing = 0;

  for (const user of demoUsers) {
    try {
      const [rows] = await pool.execute('SELECT id FROM users WHERE email = ?', [user.email]);
      if (rows.length === 0) {
        const hashed = await bcrypt.hash(user.password, 10);
        await pool.execute(
          'INSERT INTO users (email, password, name, role, department) VALUES (?, ?, ?, ?, ?)',
          [user.email, hashed, user.name, user.role, user.department]
        );
        created++;
      } else existing++;
    } catch (err) {
      console.error(`❌ Error creating user ${user.email}:`, err.message);
    }
  }

  res.json({ message: `Demo users processed. Created: ${created}, Existing: ${existing}`, created, existing });
});

// --- Registration (goes to pending_registrations) ---
router.post('/register', async (req, res) => {
  if (!pool) return res.status(500).json({ error: 'Database not ready' });

  const { email, password, name, role, department, phone } = req.body;
  if (!email || !password || !name || !role) {
    return res.status(400).json({ error: 'Email, password, name, and role are required' });
  }

  const validRoles = ['admin','doctor','nurse','staff','patient'];
  if (!validRoles.includes(role.toLowerCase())) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    // Check duplicates in both users and pending_registrations
    const [existingUser] = await pool.execute('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
    const [existingPending] = await pool.execute('SELECT id FROM pending_registrations WHERE email = ?', [email.toLowerCase()]);
    
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }
    
    if (existingPending.length > 0) {
      return res.status(400).json({ error: 'Registration request already pending for this email' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await pool.execute(
      `INSERT INTO pending_registrations 
       (email, password, name, role, department, phone) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [email.toLowerCase(), hashed, name, role.toLowerCase(), department || null, phone || null]
    );

    console.log(`📝 Registration request submitted for ${name} (${email}) as ${role}`);
    res.status(201).json({ 
      success: true, 
      message: 'Registration request submitted successfully! Please wait for admin approval.' 
    });
  } catch (err) {
    console.error('❌ Registration error:', err.message);
    res.status(500).json({ error: 'Registration request failed: ' + err.message });
  }
});

// --- Admin: Get pending registrations ---
router.get('/admin/pending-registrations', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT id, email, name, role, department, phone, status, requested_at 
      FROM pending_registrations 
      WHERE status = 'pending' 
      ORDER BY requested_at ASC
    `);
    
    console.log(`📋 Admin ${req.user.name} fetched ${rows.length} pending registrations`);
    res.json({ success: true, requests: rows });
  } catch (err) {
    console.error('❌ Fetch pending registrations error:', err.message);
    res.status(500).json({ error: 'Failed to fetch pending registrations' });
  }
});

// --- Admin: Approve registration ---
router.post('/admin/approve/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  
  try {
    // Get the pending registration
    const [rows] = await pool.execute(
      'SELECT * FROM pending_registrations WHERE id = ? AND status = "pending"', 
      [id]
    );
    
    const request = rows[0];
    if (!request) {
      return res.status(404).json({ error: 'Pending registration not found' });
    }

    // Move to users table
    const [result] = await pool.execute(
      'INSERT INTO users (email, password, name, role, department, phone) VALUES (?, ?, ?, ?, ?, ?)',
      [request.email, request.password, request.name, request.role, request.department, request.phone]
    );

    // Update pending registration status
    await pool.execute(
      `UPDATE pending_registrations 
       SET status = "approved", approved_at = NOW(), approved_by = ? 
       WHERE id = ?`,
      [req.user.id, id]
    );

    console.log(`✅ Admin ${req.user.name} approved registration for ${request.name} (${request.email})`);
    res.json({ 
      success: true, 
      message: 'Registration approved successfully! User can now login.',
      userId: result.insertId 
    });
  } catch (err) {
    console.error('❌ Approve registration error:', err.message);
    res.status(500).json({ error: 'Failed to approve registration: ' + err.message });
  }
});

// --- Admin: Reject registration ---
router.post('/admin/reject/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  
  if (!reason || reason.trim().length === 0) {
    return res.status(400).json({ error: 'Rejection reason is required' });
  }
  
  try {
    // Get the pending registration
    const [rows] = await pool.execute(
      'SELECT name, email FROM pending_registrations WHERE id = ? AND status = "pending"', 
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pending registration not found' });
    }

    const request = rows[0];

    // Update pending registration status
    const [result] = await pool.execute(
      `UPDATE pending_registrations 
       SET status = "rejected", rejection_reason = ?, rejected_at = NOW(), rejected_by = ? 
       WHERE id = ? AND status = "pending"`,
      [reason, req.user.id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Registration request not found or already processed' });
    }

    console.log(`❌ Admin ${req.user.name} rejected registration for ${request.name} (${request.email}). Reason: ${reason}`);
    res.json({ 
      success: true, 
      message: 'Registration request rejected successfully.' 
    });
  } catch (err) {
    console.error('❌ Reject registration error:', err.message);
    res.status(500).json({ error: 'Failed to reject registration: ' + err.message });
  }
});

// --- Admin: Get all registrations (approved, rejected, pending) ---
router.get('/admin/all-registrations', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        id, email, name, role, department, phone, status, 
        requested_at, approved_at, rejected_at, rejection_reason,
        approved_by, rejected_by
      FROM pending_registrations 
      ORDER BY requested_at DESC
    `);
    
    res.json({ success: true, requests: rows });
  } catch (err) {
    console.error('❌ Fetch all registrations error:', err.message);
    res.status(500).json({ error: 'Failed to fetch registration history' });
  }
});

// --- Login ---
router.post('/signin', async (req, res) => {
  if (!pool) return res.status(500).json({ error: 'Database not ready' });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);
    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    console.log(`🔐 User ${user.name} (${user.role}) logged in successfully`);
    res.json({ 
      success: true, 
      message: 'Login successful', 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        role: user.role, 
        department: user.department,
        phone: user.phone
      } 
    });
  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ error: 'Login failed: ' + err.message });
  }
});

// --- Get current user ---
router.get('/me', authenticateToken, async (req, res) => {
  res.json({ success: true, user: req.user });
});

console.log('✅ Auth routes loaded with admin approval system');
module.exports = router;