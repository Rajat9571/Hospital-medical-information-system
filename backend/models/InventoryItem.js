const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const InventoryItem = sequelize.define('InventoryItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
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
});

module.exports = InventoryItem;
