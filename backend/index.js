

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
//patient 
const patientRoutes = require('./routes/patients');
//appointment
const appointmentRoutes = require('./routes/appointments');
//doctor list
const doctorsRoutes = require('./routes/doctors');
//registration
const registrationRoutes = require('./routes/registration');
//pharmacy
const Medication = require('./models/Medication');



// Load environment variables
dotenv.config();

console.log('🚀 Starting Hospital Information System Server...');
console.log('📋 Environment:', process.env.NODE_ENV || 'development');
console.log('🗄️  Database:', process.env.DB_NAME || 'hospital_db');

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
//Add patient 
app.use('/api/patients', patientRoutes);
//appointment Booking
app.use('/api/appointments', appointmentRoutes);
//doctor list
app.use('/api/doctors', doctorsRoutes);

// Add registration routes
app.use('/api/registrations', registrationRoutes);

//Manage Pharmacy
app.use('/api/pharmacy', require('./routes/pharmacy'));

// Sync the medications table (creates if not exists)
Medication.sync({ alter: true })
  .then(() => console.log('✅ Medications table synced/created'))
  .catch(err => console.error('❌ Error syncing Medications table:', err));

//inventory management
// Inventory management
app.use('/api/inventory', require('./routes/inventory'));
//Bed Management 
app.use('/api/beds', require('./routes/beds'));








// Health check endpoint
app.get('/', (req, res) => {
  console.log('🏥 Health check accessed');
  res.json({
    status: 'success',
    message: 'Hospital Information System Backend is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    database: 'connected',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log('❌ 404 - Route not found:', req.originalUrl);
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    message: 'The requested endpoint does not exist'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Server error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}`);
  console.log(`🔗 API base URL: http://localhost:${PORT}/api`);
  console.log('📝 Available endpoints:');
  console.log('   - POST /api/auth/register');
  console.log('   - POST /api/auth/signin');
  console.log('   - GET  /api/auth/me');
  console.log('   - POST /api/auth/init-demo-users');
  //patient part
  console.log('   - GET  /api/patients');   // ✅ Added patient routes
  console.log('   - POST /api/patients');
  //appointment part
  console.log('   - GET  /api/appointments');
  console.log('   - POST /api/appointments');
  console.log('   - PUT  /api/appointments/:id');
  console.log('   - DELETE /api/appointments/:id');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received. Shutting down gracefully...');
  process.exit(0);
});



