

// models/Patient.js
const { DataTypes } = require('sequelize');
// const sequelize = require('../index').sequelize;
const sequelize = require('../utils/db');


const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
  },
  emergencyContact: {
    type: DataTypes.STRING,
  },
  bloodType: {
    type: DataTypes.STRING,
  },
  allergies: {
    type: DataTypes.TEXT,
  },
  patientType: {
    type: DataTypes.ENUM('consultancy', 'emergency'),
    allowNull: false,
    defaultValue: 'consultancy',
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'critical'),
    defaultValue: 'active',
  },
}, {
  timestamps: true, // adds createdAt + updatedAt
   createdAt: 'created_at',  // map database column
   updatedAt: 'updatedAt',   // already matches
});

module.exports = Patient;
