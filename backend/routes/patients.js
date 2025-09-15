
// // // routes/patients.js
// // const express = require('express');
// // const mysql = require('mysql2/promise');
// // const router = express.Router();
// // require('dotenv').config();

// // console.log('🔧 Loading patient routes...');

// // // Validate environment variables
// // const REQUIRED_ENV = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
// // REQUIRED_ENV.forEach(key => {
// //   if (!process.env[key]) {
// //     console.error(`❌ Environment variable ${key} is missing!`);
// //     process.exit(1);
// //   }
// // });

// // // Database connection pool
// // let pool;
// // async function initializeDatabase() {
// //   try {
// //     console.log('🗄️  Initializing database connection for patients...');
// //     pool = mysql.createPool({
// //       host: process.env.DB_HOST,
// //       user: process.env.DB_USER,
// //       password: process.env.DB_PASSWORD,
// //       database: process.env.DB_NAME,
// //       waitForConnections: true,
// //       connectionLimit: 10,
// //       queueLimit: 0
// //     });

// //     const connection = await pool.getConnection();
// //     console.log('✅ Database connected for patients');

// //     await connection.execute(`
// //       CREATE TABLE IF NOT EXISTS patients (
// //         id INT AUTO_INCREMENT PRIMARY KEY,
// //         name VARCHAR(255) NOT NULL,
// //         email VARCHAR(255) UNIQUE NOT NULL,
// //         phone VARCHAR(50) NOT NULL,
// //         dateOfBirth DATE NOT NULL,
// //         gender ENUM('male','female','other') NOT NULL,
// //         address TEXT,
// //         emergencyContact VARCHAR(255),
// //         bloodType VARCHAR(10),
// //         allergies TEXT,
// //         status ENUM('active','inactive','critical') DEFAULT 'active',
// //         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// //       )
// //     `);
// //     console.log('✅ Patients table ready');

// //     connection.release();
// //   } catch (err) {
// //     console.error('❌ Database initialization failed:', err.message);
// //     process.exit(1);
// //   }
// // }

// // initializeDatabase();

// // // Get all patients
// // router.get('/', async (req, res) => {
// //   try {
// //     const [rows] = await pool.execute('SELECT * FROM patients ORDER BY created_at DESC');
// //     res.json(rows);
// //   } catch (err) {
// //     console.error('❌ Error fetching patients:', err.message);
// //     res.status(500).json({ error: 'Database error' });
// //   }
// // });

// // // Get single patient by ID (for View/Edit)
// // router.get('/:id', async (req, res) => {
// //   try {
// //     const [rows] = await pool.execute('SELECT * FROM patients WHERE id = ?', [req.params.id]);
// //     if (rows.length === 0) return res.status(404).json({ error: 'Patient not found' });
// //     res.json(rows[0]);
// //   } catch (err) {
// //     console.error('❌ Error fetching patient:', err.message);
// //     res.status(500).json({ error: 'Database error' });
// //   }
// // });

// // // Add a new patient
// // router.post('/', async (req, res) => {
// //   const { name, email, phone, dateOfBirth, gender, address, emergencyContact, bloodType, allergies, status } = req.body;
// //   if (!name || !email || !phone || !dateOfBirth || !gender) {
// //     return res.status(400).json({ error: 'Name, email, phone, date of birth, and gender are required' });
// //   }

// //   try {
// //     const [existing] = await pool.execute('SELECT id FROM patients WHERE email = ?', [email]);
// //     if (existing.length > 0) return res.status(400).json({ error: 'Patient with this email already exists' });

// //     const [result] = await pool.execute(`
// //       INSERT INTO patients 
// //       (name, email, phone, dateOfBirth, gender, address, emergencyContact, bloodType, allergies, status) 
// //       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
// //     `, [name, email, phone, dateOfBirth, gender, address || null, emergencyContact || null, bloodType || null, allergies || null, status || 'active']);

// //     res.status(201).json({ id: result.insertId, name, email, phone, dateOfBirth, gender, address, emergencyContact, bloodType, allergies, status: status || 'active' });
// //   } catch (err) {
// //     console.error('❌ Error adding patient:', err.message);
// //     res.status(500).json({ error: 'Database error' });
// //   }
// // });

// // // Update patient
// // router.put('/:id', async (req, res) => {
// //   const { id } = req.params;
// //   const { name, email, phone, dateOfBirth, gender, address, emergencyContact, bloodType, allergies, status } = req.body;

// //   try {
// //     const [existing] = await pool.execute('SELECT id FROM patients WHERE id = ?', [id]);
// //     if (existing.length === 0) {
// //       return res.status(404).json({ error: 'Patient not found' });
// //     }

// //     await pool.execute(
// //       `UPDATE patients SET name=?, email=?, phone=?, dateOfBirth=?, gender=?, address=?, emergencyContact=?, bloodType=?, allergies=?, status=? WHERE id=?`,
// //       [name, email, phone, dateOfBirth, gender, address, emergencyContact, bloodType, allergies, status, id]
// //     );

// //     res.json({ message: 'Patient updated successfully' });
// //   } catch (err) {
// //     console.error('❌ Error updating patient:', err.message);
// //     res.status(500).json({ error: 'Database error' });
// //   }
// // });




// // console.log('✅ Patient routes loaded');
// // module.exports = router;






// // routes/patients.js
// const express = require('express');
// const mysql = require('mysql2/promise');
// const router = express.Router();
// require('dotenv').config();

// console.log('🔧 Loading patient routes...');

// // Required env
// const REQUIRED_ENV = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
// REQUIRED_ENV.forEach(key => {
//   if (!process.env[key]) {
//     console.error(`❌ Environment variable ${key} is missing!`);
//     process.exit(1);
//   }
// });

// // DB pool
// let pool;
// async function initializeDatabase() {
//   try {
//     console.log('🗄️  Initializing DB connection for patients...');
//     pool = mysql.createPool({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
//       waitForConnections: true,
//       connectionLimit: 10,
//       queueLimit: 0,
//       charset: 'utf8mb4'
//     });

//     const conn = await pool.getConnection();
//     console.log('✅ Database connected for patients');

//     // Create table (keeps your column names like dateOfBirth to match frontend)
//     await conn.execute(`
//       CREATE TABLE IF NOT EXISTS patients (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         phone VARCHAR(50) NOT NULL,
//         dateOfBirth DATE NOT NULL,
//         gender ENUM('male','female','other') NOT NULL,
//         address TEXT,
//         emergencyContact VARCHAR(255),
//         bloodType VARCHAR(10),
//         allergies TEXT,
//         patientType ENUM('consultancy','emergency') NOT NULL DEFAULT 'consultancy',
//         status ENUM('active','inactive','critical') NOT NULL DEFAULT 'active',
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//       ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
//     `);

//     console.log('✅ Patients table ready');
//     conn.release();
//   } catch (err) {
//     console.error('❌ Database initialization failed:', err.message);
//     process.exit(1);
//   }
// }
// initializeDatabase().catch(err => {
//   console.error('❌ initializeDatabase error:', err);
//   process.exit(1);
// });

// // small helper (placeholder) — implement email/SMS logic here
// async function notifyEmergency(patient) {
//   try {
//     console.log(`🔔 Emergency notify: ${patient.name} (${patient.phone})`);
//     // TODO: call nodemailer / twilio / push notification
//   } catch (err) {
//     console.error('❌ notifyEmergency error:', err.message);
//   }
// }

// // middleware to ensure pool
// function ensurePool(req, res, next) {
//   if (!pool) return res.status(503).json({ error: 'Database not initialized' });
//   next();
// }

// /* ------------------------
//    GET /api/patients
//    list all patients
//    ------------------------ */
// router.get('/', ensurePool, async (req, res) => {
//   try {
//     const [rows] = await pool.execute('SELECT * FROM patients ORDER BY created_at DESC');
//     res.json(rows);
//   } catch (err) {
//     console.error('❌ Error fetching patients:', err.message);
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// /* ------------------------
//    GET /api/patients/:id
//    single patient
//    ------------------------ */
// router.get('/:id', ensurePool, async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [rows] = await pool.execute('SELECT * FROM patients WHERE id = ?', [id]);
//     if (rows.length === 0) return res.status(404).json({ error: 'Patient not found' });
//     res.json(rows[0]);
//   } catch (err) {
//     console.error('❌ Error fetching patient:', err.message);
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// /* ------------------------
//    POST /api/patients
//    add new patient (includes patientType)
//    ------------------------ */
// router.post('/', ensurePool, async (req, res) => {
//   const {
//     name,
//     email,
//     phone,
//     dateOfBirth,
//     gender,
//     address,
//     emergencyContact,
//     bloodType,
//     allergies,
//     status,
//     patientType
//   } = req.body;

//   // basic validation
//   if (!name || !email || !phone || !dateOfBirth || !gender) {
//     return res.status(400).json({ error: 'Name, email, phone, dateOfBirth and gender are required' });
//   }

//   // validate patientType
//   const allowedTypes = ['consultancy', 'emergency'];
//   const finalPatientType = allowedTypes.includes(patientType) ? patientType : 'consultancy';

//   try {
//     // check duplicate email
//     const [existing] = await pool.execute('SELECT id FROM patients WHERE email = ?', [email]);
//     if (existing.length > 0) {
//       return res.status(400).json({ error: 'Patient with this email already exists' });
//     }

//     const [result] = await pool.execute(
//       `INSERT INTO patients
//         (name, email, phone, dateOfBirth, gender, address, emergencyContact, bloodType, allergies, patientType, status)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         name,
//         email,
//         phone,
//         dateOfBirth,
//         gender,
//         address || null,
//         emergencyContact || null,
//         bloodType || null,
//         allergies || null,
//         finalPatientType,
//         status || 'active'
//       ]
//     );

//     // return newly created row
//     const [rows] = await pool.execute('SELECT * FROM patients WHERE id = ?', [result.insertId]);
//     const newPatient = rows[0];

//     // non-blocking emergency notification
//     if (newPatient?.patientType === 'emergency') {
//       notifyEmergency(newPatient).catch(err => console.error('notifyEmergency error:', err));
//     }

//     res.status(201).json(newPatient);
//   } catch (err) {
//     console.error('❌ Error adding patient:', err.message);
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// /* ------------------------
//    PUT /api/patients/:id
//    update patient (preserve fields if not provided)
//    ------------------------ */
// router.put('/:id', ensurePool, async (req, res) => {
//   const { id } = req.params;
//   const {
//     name,
//     email,
//     phone,
//     dateOfBirth,
//     gender,
//     address,
//     emergencyContact,
//     bloodType,
//     allergies,
//     status,
//     patientType
//   } = req.body;

//   try {
//     const [existingRows] = await pool.execute('SELECT * FROM patients WHERE id = ?', [id]);
//     if (existingRows.length === 0) return res.status(404).json({ error: 'Patient not found' });
//     const existing = existingRows[0];

//     // If email changed, ensure uniqueness
//     if (email && email !== existing.email) {
//       const [dup] = await pool.execute('SELECT id FROM patients WHERE email = ? AND id <> ?', [email, id]);
//       if (dup.length > 0) return res.status(400).json({ error: 'Another patient is using this email' });
//     }

//     // Decide final values (preserve existing if undefined)
//     const finalPatientType = (patientType && ['consultancy', 'emergency'].includes(patientType)) ? patientType : existing.patientType;
//     const finalName = name !== undefined ? name : existing.name;
//     const finalEmail = email !== undefined ? email : existing.email;
//     const finalPhone = phone !== undefined ? phone : existing.phone;
//     const finalDOB = dateOfBirth !== undefined ? dateOfBirth : existing.dateOfBirth;
//     const finalGender = gender !== undefined ? gender : existing.gender;
//     const finalAddress = address !== undefined ? address : existing.address;
//     const finalEmergencyContact = emergencyContact !== undefined ? emergencyContact : existing.emergencyContact;
//     const finalBloodType = bloodType !== undefined ? bloodType : existing.bloodType;
//     const finalAllergies = allergies !== undefined ? allergies : existing.allergies;
//     const finalStatus = status !== undefined ? status : existing.status;

//     await pool.execute(
//       `UPDATE patients SET
//          name=?, email=?, phone=?, dateOfBirth=?, gender=?, address=?, emergencyContact=?, bloodType=?, allergies=?, patientType=?, status=?
//        WHERE id = ?`,
//       [
//         finalName,
//         finalEmail,
//         finalPhone,
//         finalDOB,
//         finalGender,
//         finalAddress || null,
//         finalEmergencyContact || null,
//         finalBloodType || null,
//         finalAllergies || null,
//         finalPatientType,
//         finalStatus,
//         id
//       ]
//     );

//     const [updatedRows] = await pool.execute('SELECT * FROM patients WHERE id = ?', [id]);
//     const updated = updatedRows[0];

//     // If patientType switched to emergency, notify
//     if (existing.patientType !== 'emergency' && updated.patientType === 'emergency') {
//       notifyEmergency(updated).catch(err => console.error('notifyEmergency error:', err));
//     }

//     res.json({ message: 'Patient updated successfully', patient: updated });
//   } catch (err) {
//     console.error('❌ Error updating patient:', err.message);
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// console.log('✅ Patient routes loaded');
// module.exports = router;



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
