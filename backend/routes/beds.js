// // const router = require('express').Router();
// // const Bed = require('../models/Bed');
// // const Patient = require('../models/Patient');

// // // Get all beds with assigned patient info
// // router.get('/', async (req, res) => {
// //   try {
// //     const beds = await Bed.findAll({ include: { model: Patient, as: 'patient' } });
// //     res.json(beds);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // // Get unassigned patients (active and without a bed)
// // router.get('/unassigned-patients', async (req, res) => {
// //   try {
// //     const patients = await Patient.findAll({
// //       where: {
// //         status: 'active'
// //       },
// //       include: {
// //         model: Bed,
// //         as: 'bed',
// //         required: false
// //       }
// //     });

// //     const unassigned = patients.filter(p => !p.bed);
// //     res.json(unassigned);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // // Assign a bed
// // router.post('/:id/assign', async (req, res) => {
// //   try {
// //     const bed = await Bed.findByPk(req.params.id);
// //     if (!bed) return res.status(404).json({ message: 'Bed not found' });

// //     const patient = await Patient.findByPk(req.body.patient_id);
// //     if (!patient) return res.status(404).json({ message: 'Patient not found' });

// //     bed.status = 'occupied';
// //     bed.patient_id = patient.id;
// //     bed.admission_date = new Date();
// //     bed.assigned_doctor = req.body.assigned_doctor || null;

// //     await bed.save();
// //     res.json(await Bed.findByPk(bed.id, { include: { model: Patient, as: 'patient' } }));
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // // Discharge a bed
// // router.post('/:id/discharge', async (req, res) => {
// //   try {
// //     const bed = await Bed.findByPk(req.params.id);
// //     if (!bed) return res.status(404).json({ message: 'Bed not found' });

// //     bed.status = 'cleaning';
// //     bed.patient_id = null;
// //     bed.admission_date = null;
// //     bed.assigned_doctor = null;
// //     bed.maintenance_reason = 'Post-discharge cleaning';

// //     await bed.save();
// //     res.json(bed);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // // Toggle maintenance
// // router.post('/:id/maintenance', async (req, res) => {
// //   try {
// //     const bed = await Bed.findByPk(req.params.id);
// //     if (!bed) return res.status(404).json({ message: 'Bed not found' });

// //     bed.status = bed.status === 'maintenance' ? 'available' : 'maintenance';
// //     bed.maintenance_reason = bed.status === 'maintenance' ? 'Scheduled maintenance' : null;

// //     await bed.save();
// //     res.json(bed);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // // Add new bed
// // router.post('/', async (req, res) => {
// //   try {
// //     const newBed = await Bed.create(req.body);
// //     res.json(newBed);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // module.exports = router;





// const router = require('express').Router();
// const Bed = require('../models/Bed');
// const Patient = require('../models/Patient');

// // GET all beds with assigned patient info
// router.get('/', async (req, res) => {
//   try {
//     const beds = await Bed.findAll({
//       include: { model: Patient, as: 'patient' } // alias must match model association
//     });
//     res.json(beds);
//   } catch (err) {
//     console.error('Error fetching beds:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // GET unassigned patients (active and without a bed)
// router.get('/unassigned-patients', async (req, res) => {
//   try {
//     const patients = await Patient.findAll({
//       where: { status: 'active' },
//       include: { model: Bed, as: 'bed', required: false }
//     });

//     const unassigned = patients.filter(p => !p.bed);
//     res.json(unassigned);
//   } catch (err) {
//     console.error('Error fetching unassigned patients:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // // Assign a bed to a patient
// // router.post('/:id/assign', async (req, res) => {
// //   try {
// //     const bed = await Bed.findByPk(req.params.id);
// //     if (!bed) return res.status(404).json({ message: 'Bed not found' });

// //     const patient = await Patient.findByPk(req.body.patient_id);
// //     if (!patient) return res.status(404).json({ message: 'Patient not found' });

// //     bed.status = 'occupied';
// //     bed.patient_id = patient.id;
// //     bed.admission_date = new Date();
// //     bed.assigned_doctor = req.body.assigned_doctor || null;

// //     await bed.save();

// //     // Return the bed including patient info
// //     const updatedBed = await Bed.findByPk(bed.id, { include: { model: Patient, as: 'patient' } });
// //     res.json(updatedBed);
// //   } catch (err) {
// //     console.error('Error assigning bed:', err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });



// // Assign a bed
// router.put('/:id/assign', async (req, res) => {
//   try {
//     const bed = await Bed.findByPk(req.params.id);
//     if (!bed) return res.status(404).json({ message: 'Bed not found' });

//     const patient = await Patient.findByPk(req.body.patient_id);
//     if (!patient) return res.status(404).json({ message: 'Patient not found' });

//     bed.status = 'occupied';
//     bed.patient_id = patient.id;
//     bed.admission_date = new Date();
//     bed.assigned_doctor = req.body.assigned_doctor || null;

//     await bed.save();
//     const updatedBed = await Bed.findByPk(bed.id, { include: { model: Patient, as: 'patient' } });
//     res.json(updatedBed);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Toggle maintenance
// router.put('/:id/maintenance', async (req, res) => {
//   try {
//     const bed = await Bed.findByPk(req.params.id);
//     if (!bed) return res.status(404).json({ message: 'Bed not found' });

//     bed.status = bed.status === 'maintenance' ? 'available' : 'maintenance';
//     bed.maintenance_reason = bed.status === 'maintenance' ? 'Scheduled maintenance' : null;

//     await bed.save();
//     res.json(bed);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// // Discharge a patient from a bed
// router.post('/:id/discharge', async (req, res) => {
//   try {
//     const bed = await Bed.findByPk(req.params.id);
//     if (!bed) return res.status(404).json({ message: 'Bed not found' });

//     bed.status = 'cleaning';
//     bed.patient_id = null;
//     bed.admission_date = null;
//     bed.assigned_doctor = null;
//     bed.maintenance_reason = 'Post-discharge cleaning';

//     await bed.save();
//     res.json(bed);
//   } catch (err) {
//     console.error('Error discharging bed:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // // Toggle maintenance status for a bed
// // router.post('/:id/maintenance', async (req, res) => {
// //   try {
// //     const bed = await Bed.findByPk(req.params.id);
// //     if (!bed) return res.status(404).json({ message: 'Bed not found' });

// //     bed.status = bed.status === 'maintenance' ? 'available' : 'maintenance';
// //     bed.maintenance_reason = bed.status === 'maintenance' ? 'Scheduled maintenance' : null;

// //     await bed.save();
// //     res.json(bed);
// //   } catch (err) {
// //     console.error('Error toggling maintenance:', err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // Add a new bed
// router.post('/', async (req, res) => {
//   try {
//     const newBed = await Bed.create(req.body);
//     res.json(newBed);
//   } catch (err) {
//     console.error('Error adding bed:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;






const router = require('express').Router();
const Bed = require('../models/Bed');
const Patient = require('../models/Patient');

// GET all beds with assigned patient info
router.get('/', async (req, res) => {
  try {
    const beds = await Bed.findAll({
      include: { model: Patient, as: 'patient' }
    });
    res.json(beds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET unassigned patients
router.get('/unassigned-patients', async (req, res) => {
  try {
    const patients = await Patient.findAll({
      where: { status: 'active' },
      include: { model: Bed, as: 'bed', required: false }
    });
    const unassigned = patients.filter(p => !p.bed);
    res.json(unassigned);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Assign a bed
router.put('/:id/assign', async (req, res) => {
  try {
    const bed = await Bed.findByPk(req.params.id);
    if (!bed) return res.status(404).json({ message: 'Bed not found' });

    const patient = await Patient.findByPk(req.body.patient_id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    bed.status = 'occupied';
    bed.patient_id = patient.id;
    bed.admission_date = new Date();
    bed.assigned_doctor = req.body.assigned_doctor || null;

    await bed.save();

    const updatedBed = await Bed.findByPk(bed.id, { include: { model: Patient, as: 'patient' } });
    res.json(updatedBed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle maintenance
router.put('/:id/maintenance', async (req, res) => {
  try {
    const bed = await Bed.findByPk(req.params.id);
    if (!bed) return res.status(404).json({ message: 'Bed not found' });

    bed.status = bed.status === 'maintenance' ? 'available' : 'maintenance';
    bed.maintenance_reason = bed.status === 'maintenance' ? 'Scheduled maintenance' : null;

    await bed.save();
    res.json(bed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Discharge a patient
router.put('/:id/discharge', async (req, res) => {
  try {
    const bed = await Bed.findByPk(req.params.id);
    if (!bed) return res.status(404).json({ message: 'Bed not found' });

    bed.status = 'cleaning';
    bed.patient_id = null;
    bed.admission_date = null;
    bed.assigned_doctor = null;
    bed.maintenance_reason = 'Post-discharge cleaning';

    await bed.save();
    res.json(bed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new bed
router.post('/', async (req, res) => {
  try {
    const newBed = await Bed.create(req.body);
    res.json(newBed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
