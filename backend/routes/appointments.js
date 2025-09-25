
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const User = require('../models/User'); // doctor comes from users

// // GET all appointments (with patient + doctor info)
// router.get('/', async (req, res) => {
//   try {
//     const appointments = await Appointment.findAll({
//       include: [
//         { model: Patient, attributes: ['id', 'name', 'email', 'status'] },
//         {
//           model: User,
//           as: 'doctor',
//           attributes: ['id', 'name', 'email', 'role', 'department'],
//           required: false // LEFT JOIN to include appointments even without a doctor
//         }
//       ],
//       order: [['date', 'ASC'], ['time', 'ASC']]
//     });
//     res.json(appointments);
//   } catch (err) {
//     console.error('❌ Error fetching appointments:', err.message);
//     console.error(err.stack);
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// GET all appointments (with patient + doctor info)
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        {
          model: Patient,
          attributes: ['id', 'name', 'email', 'status'],
          required: false // LEFT JOIN to include even if patient missing
        },
        {
          model: User,
          as: 'doctor',
          attributes: ['id', 'name', 'email', 'role', 'department'],
          required: false
        }
      ],
      order: [['date', 'ASC'], ['time', 'ASC']]
    });

    console.log("✅ Appointments fetched:", JSON.stringify(appointments, null, 2));
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

// // CREATE new appointment
// router.post('/', async (req, res) => {
//   const { patientId, doctorId, department, date, time, type, notes } = req.body;

//   if (!patientId || !department || !date || !time) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     // Validate patient
//     const patient = await Patient.findByPk(patientId);
//     if (!patient || patient.status !== 'active') {
//       return res.status(400).json({ error: 'Invalid or inactive patient' });
//     }

//     // Validate doctor (if provided)
//     let doctor = null;
//     if (doctorId) {
//       doctor = await User.findByPk(doctorId);
//       if (!doctor || doctor.role !== 'doctor') {
//         return res.status(400).json({ error: 'Selected user is not a doctor' });
//       }
//     }

//     // Create appointment
//     const appointment = await Appointment.create({
//       patientId,
//       doctorId: doctor ? doctor.id : null,
//       department,
//       date,
//       time,
//       type,
//       notes,
//     });

//     res.status(201).json(appointment);
//   } catch (err) {
//     console.error('❌ Error creating appointment:', err.message);
//     console.error(err.stack);
//     res.status(500).json({ error: 'Database error' });
//   }
// });



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

    // Fetch full appointment with associations
    const fullAppointment = await Appointment.findByPk(appointment.id, {
      include: [
        { model: Patient, attributes: ['id', 'name', 'email', 'status'] },
        {
          model: User,
          as: 'doctor',
          attributes: ['id', 'name', 'email', 'role', 'department'],
          required: false,
        },
      ],
    });

    res.status(201).json(fullAppointment);
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


