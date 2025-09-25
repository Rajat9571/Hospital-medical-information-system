const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Medication = sequelize.define('Medication', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('in-stock', 'low-stock', 'out-of-stock'),
    defaultValue: 'in-stock',
  },
  notes: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

module.exports = Medication;
