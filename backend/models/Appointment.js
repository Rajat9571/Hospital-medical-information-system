

// // models/Appointment.js
// const { DataTypes } = require('sequelize');
// // const sequelize = require('../index').sequelize;
// const sequelize = require('../utils/db');
// const Patient = require('./Patient');
// const User = require('./User'); // assuming you already have User model

// const Appointment = sequelize.define('Appointment', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   patientId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   doctorId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   department: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   date: {
//     type: DataTypes.DATEONLY,
//     allowNull: false,
//   },
//   time: {
//     type: DataTypes.TIME,
//     allowNull: false,
//   },
//   type: {
//     type: DataTypes.ENUM(
//       'consultation',
//       'follow-up',
//       'emergency',
//       'surgery',
//       'therapy',
//       'check-up',
//       'vaccination',
//       'diagnostic'
//     ),
//     defaultValue: 'consultation',
//   },
//   status: {
//     type: DataTypes.ENUM('scheduled', 'confirmed', 'completed', 'cancelled'),
//     defaultValue: 'scheduled',
//   },
//   notes: {
//     type: DataTypes.TEXT,
//   },
// }, {
//   timestamps: true,
// });

// // Associations
// Appointment.belongsTo(Patient, { foreignKey: 'patientId' });
// Appointment.belongsTo(User, { foreignKey: 'doctorId', as: 'doctor' });

// module.exports = Appointment;





const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Patient = require('./Patient');
const User = require('./User');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: true,  // make optional
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM(
      'consultation',
      'follow-up',
      'emergency',
      'surgery',
      'therapy',
      'check-up',
      'vaccination',
      'diagnostic'
    ),
    defaultValue: 'consultation',
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'confirmed', 'completed', 'cancelled'),
    defaultValue: 'scheduled',
  },
  notes: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',  // matches DB column
  updatedAt: 'updatedAt',  // matches DB column
});

Appointment.belongsTo(Patient, { foreignKey: 'patientId' });
Appointment.belongsTo(User, { foreignKey: 'doctorId', as: 'doctor' });

module.exports = Appointment;
