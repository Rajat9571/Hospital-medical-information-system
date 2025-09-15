// // // routes/appointments.js
// // const express = require('express');
// // const router = express.Router();
// // const Appointment = require('../models/Appointment');
// // const Patient = require('../models/Patient');

// // // Get all appointments (with patient info)
// // router.get('/', async (req, res) => {
// //   try {
// //     const appointments = await Appointment.findAll({
// //       include: { model: Patient, attributes: ['id', 'name', 'email', 'status'] },
// //       order: [['date', 'ASC'], ['time', 'ASC']]
// //     });
// //     res.json(appointments);
// //   } catch (err) {
// //     console.error('❌ Error fetching appointments:', err.message);
// //     res.status(500).json({ error: 'Database error' });
// //   }
// // });

// // // Get single appointment
// // router.get('/:id', async (req, res) => {
// //   try {
// //     const appointment = await Appointment.findByPk(req.params.id, {
// //       include: Patient
// //     });
// //     if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
// //     res.json(appointment);
// //   } catch (err) {
// //     res.status(500).json({ error: 'Database error' });
// //   }
// // });

// // // Create appointment
// // router.post('/', async (req, res) => {
// //   const { patientId, doctorName, department, date, time, type, notes } = req.body;
// //   if (!patientId || !doctorName || !department || !date || !time) {
// //     return res.status(400).json({ error: 'Missing required fields' });
// //   }

// //   try {
// //     const patient = await Patient.findByPk(patientId);
// //     if (!patient || patient.status !== 'active') {
// //       return res.status(400).json({ error: 'Invalid or inactive patient' });
// //     }

// //     const appointment = await Appointment.create({
// //       patientId,
// //       doctorName,
// //       department,
// //       date,
// //       time,
// //       type,
// //       notes,
// //     });

// //     res.status(201).json(appointment);
// //   } catch (err) {
// //     console.error('❌ Error creating appointment:', err.message);
// //     res.status(500).json({ error: 'Database error' });
// //   }
// // });

// // // Update appointment
// // router.put('/:id', async (req, res) => {
// //   try {
// //     const appointment = await Appointment.findByPk(req.params.id);
// //     if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

// //     await appointment.update(req.body);
// //     res.json({ message: 'Appointment updated', appointment });
// //   } catch (err) {
// //     res.status(500).json({ error: 'Database error' });
// //   }
// // });

// // // Delete appointment
// // router.delete('/:id', async (req, res) => {
// //   try {
// //     const appointment = await Appointment.findByPk(req.params.id);
// //     if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

// //     await appointment.destroy();
// //     res.json({ message: 'Appointment deleted' });
// //   } catch (err) {
// //     res.status(500).json({ error: 'Database error' });
// //   }
// // });

// // module.exports = router;




// // routes/appointments.js
// const express = require('express');
// const router = express.Router();
// const Appointment = require('../models/Appointment');
// const Patient = require('../models/Patient');
// const User = require('../models/User'); // doctor comes from users

// // Get all appointments (with patient + doctor info)
// // router.get('/', async (req, res) => {
// //   try {
// //     const appointments = await Appointment.findAll({
// //       include: [
// //         { model: Patient, attributes: ['id', 'name', 'email', 'status'] },
// //         { model: User, as: 'doctor', attributes: ['id', 'name', 'email', 'role'] }
// //       ],
// //       order: [['date', 'ASC'], ['time', 'ASC']]
// //     });
// //     res.json(appointments);
// //   } catch (err) {
// //     console.error('❌ Error fetching appointments:', err.message);
// //     res.status(500).json({ error: 'Database error' });
// //   }
// // });

// // Get single appointment
// router.get('/:id', async (req, res) => {
//   try {
//     const appointment = await Appointment.findByPk(req.params.id, {
//       include: [
//         { model: Patient },
//         { model: User, as: 'doctor', attributes: ['id', 'name', 'email', 'role'] }
//       ]
//     });
//     if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
//     res.json(appointment);
//   } catch (err) {
//     res.status(500).json({ error: 'Database error' });
//   }
// });


// router.get('/', async (req, res) => {
//   try {
//     const appointments = await Appointment.findAll({
//       include: [
//         { model: Patient, attributes: ['id', 'name', 'email', 'status'] },
//         { 
//           model: User, 
//           as: 'doctor', 
//           attributes: ['id', 'name', 'email', 'role', 'department'],
//           required: false  // Add this to make it a LEFT JOIN
//         }
//       ],
//       order: [['date', 'ASC'], ['time', 'ASC']]
//     });
//     res.json(appointments);
//   } catch (err) {
//     console.error('❌ Error fetching appointments:', err.message);
//     console.error(err.stack); // Add this to see full error
//     res.status(500).json({ error: 'Database error' });
//   }
// });


// // Create appointment
// router.post('/', async (req, res) => {
//   const { patientId, doctorId, department, date, time, type, notes } = req.body;

//   if (!patientId || !doctorId || !department || !date || !time) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     // ✅ Validate patient
//     const patient = await Patient.findByPk(patientId);
//     if (!patient || patient.status !== 'active') {
//       return res.status(400).json({ error: 'Invalid or inactive patient' });
//     }

//     // ✅ Validate doctor role
//     const doctor = await User.findByPk(doctorId);
//     if (!doctor || doctor.role !== 'doctor') {
//       return res.status(400).json({ error: 'Selected user is not a doctor' });
//     }

//     // Create appointment
//     const appointment = await Appointment.create({
//       patientId,
//       doctorId,
//       department,
//       date,
//       time,
//       type,
//       notes,
//     });

//     res.status(201).json(appointment);
//   } catch (err) {
//     console.error('❌ Error creating appointment:', err.message);
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// // Update appointment
// router.put('/:id', async (req, res) => {
//   try {
//     const appointment = await Appointment.findByPk(req.params.id);
//     if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

//     await appointment.update(req.body);
//     res.json({ message: 'Appointment updated', appointment });
//   } catch (err) {
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// // Delete appointment
// router.delete('/:id', async (req, res) => {
//   try {
//     const appointment = await Appointment.findByPk(req.params.id);
//     if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

//     await appointment.destroy();
//     res.json({ message: 'Appointment deleted' });
//   } catch (err) {
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const User = require('../models/User'); // doctor comes from users

// GET all appointments (with patient + doctor info)
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        { model: Patient, attributes: ['id', 'name', 'email', 'status'] },
        {
          model: User,
          as: 'doctor',
          attributes: ['id', 'name', 'email', 'role', 'department'],
          required: false // LEFT JOIN to include appointments even without a doctor
        }
      ],
      order: [['date', 'ASC'], ['time', 'ASC']]
    });
    res.json(appointments);
  } catch (err) {
    console.error('❌ Error fetching appointments:', err.message);
    console.error(err.stack);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET single appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        { model: Patient, attributes: ['id', 'name', 'email', 'status'] },
        { model: User, as: 'doctor', attributes: ['id', 'name', 'email', 'role', 'department'], required: false }
      ]
    });
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    console.error('❌ Error fetching appointment:', err.message);
    console.error(err.stack);
    res.status(500).json({ error: 'Database error' });
  }
});

// CREATE new appointment
router.post('/', async (req, res) => {
  const { patientId, doctorId, department, date, time, type, notes } = req.body;

  if (!patientId || !department || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Validate patient
    const patient = await Patient.findByPk(patientId);
    if (!patient || patient.status !== 'active') {
      return res.status(400).json({ error: 'Invalid or inactive patient' });
    }

    // Validate doctor (if provided)
    let doctor = null;
    if (doctorId) {
      doctor = await User.findByPk(doctorId);
      if (!doctor || doctor.role !== 'doctor') {
        return res.status(400).json({ error: 'Selected user is not a doctor' });
      }
    }

    // Create appointment
    const appointment = await Appointment.create({
      patientId,
      doctorId: doctor ? doctor.id : null,
      department,
      date,
      time,
      type,
      notes,
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.error('❌ Error creating appointment:', err.message);
    console.error(err.stack);
    res.status(500).json({ error: 'Database error' });
  }
});

// UPDATE appointment by ID
router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

    const { doctorId } = req.body;

    // Validate doctor if updating doctorId
    if (doctorId) {
      const doctor = await User.findByPk(doctorId);
      if (!doctor || doctor.role !== 'doctor') {
        return res.status(400).json({ error: 'Selected user is not a doctor' });
      }
    }

    await appointment.update(req.body);
    res.json({ message: 'Appointment updated', appointment });
  } catch (err) {
    console.error('❌ Error updating appointment:', err.message);
    console.error(err.stack);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE appointment by ID
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

    await appointment.destroy();
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    console.error('❌ Error deleting appointment:', err.message);
    console.error(err.stack);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;


