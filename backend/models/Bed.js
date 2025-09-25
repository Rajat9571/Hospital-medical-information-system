// const { DataTypes } = require('sequelize');
// const sequelize = require('../utils/db');
// const Patient = require('./Patient');

// const Bed = sequelize.define('Bed', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   number: { type: DataTypes.STRING, allowNull: false },
//   ward: { type: DataTypes.STRING, allowNull: false },
//   bed_type: { 
//     type: DataTypes.ENUM('general', 'icu', 'emergency', 'private'), 
//     defaultValue: 'general' 
//   },
//   room_number: { type: DataTypes.STRING },
//   status: { 
//     type: DataTypes.ENUM('available', 'occupied', 'maintenance', 'cleaning'), 
//     defaultValue: 'available' 
//   },
//   patient_id: {           // <-- Add this
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   admission_date: { type: DataTypes.DATE },
//   assigned_doctor: { type: DataTypes.STRING },
//   maintenance_reason: { type: DataTypes.STRING }
// }, {
//   timestamps: true,
//   createdAt: 'created_at',
//   updatedAt: 'updatedAt'
// });

// // Associations
// Bed.belongsTo(Patient, { foreignKey: 'patient_id' }); // Remove `as` for simplicity
// Patient.hasOne(Bed, { foreignKey: 'patient_id' });    // Remove `as`

// module.exports = Bed;




const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Patient = require('./Patient');

const Bed = sequelize.define('Bed', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  number: { type: DataTypes.STRING, allowNull: false },
  ward: { type: DataTypes.STRING, allowNull: false },
  bed_type: { type: DataTypes.ENUM('general', 'icu', 'emergency', 'private'), defaultValue: 'general' },
  room_number: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('available', 'occupied', 'maintenance', 'cleaning'), defaultValue: 'available' },
  patient_id: { type: DataTypes.INTEGER, allowNull: true },
  admission_date: { type: DataTypes.DATE },
  assigned_doctor: { type: DataTypes.STRING },
  maintenance_reason: { type: DataTypes.STRING }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updatedAt'
});

// Associations (with aliases to match your router)
Bed.belongsTo(Patient, { foreignKey: 'patient_id', as: 'patient' }); // alias must match include in router
Patient.hasOne(Bed, { foreignKey: 'patient_id', as: 'bed' });         // alias must match include in router

module.exports = Bed;
