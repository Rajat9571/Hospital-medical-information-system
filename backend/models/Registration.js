const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db'); // your sequelize instance

const Registration = sequelize.define('Registration', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  role: {
    type: DataTypes.ENUM('admin','doctor','nurse','staff','patient'),
    allowNull: false,
  },
  department: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  status: {
    type: DataTypes.ENUM('pending','approved','rejected'),
    defaultValue: 'pending',
  },
  requested_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  approved_at: { type: DataTypes.DATE, allowNull: true },
  rejected_at: { type: DataTypes.DATE, allowNull: true },
  rejection_reason: { type: DataTypes.TEXT },
}, {
  tableName: 'pending_registrations',
  timestamps: false,
});

module.exports = Registration;
