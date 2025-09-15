const { DataTypes } = require('sequelize');
// const sequelize = require('../index').sequelize;
const sequelize = require('../utils/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'patient',
  },
  name: DataTypes.STRING,
  department: DataTypes.STRING,
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    },
  },
  createdAt: 'created_at', // map Sequelize's createdAt → DB column
  updatedAt: 'updated_at', // map Sequelize's updatedAt → DB column
});

User.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;