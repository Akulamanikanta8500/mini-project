const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const Application = require('../models/Application');

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'backend/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// @route   POST /api/applications
// @desc    Submit a new TC application
router.post('/', upload.single('noDuesFile'), async (req, res) => {
    try {
        const applicationData = { ...req.body };
        if (req.file) {
            applicationData.noDuesFile = req.file.filename;
        }

        const newApplication = new Application(applicationData);
        const application = await newApplication.save();
        res.json(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/applications/student/:studentId
// @desc    Get application status for a specific student
router.get('/student/:studentId', async (req, res) => {
    try {
        const application = await Application.findOne({ studentId: req.params.studentId }).sort({ createdAt: -1 });
        if (!application) return res.status(404).json({ msg: 'No application found for this student' });
        res.json(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/applications
// @desc    Get all applications (Admin view)
router.get('/', async (req, res) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 });
        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/applications/:id
// @desc    Get specific application details
router.get('/:id', async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) return res.status(404).json({ msg: 'Application not found' });
        res.json(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PATCH /api/applications/:id/status
// @desc    Update application status (Approve/Reject)
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['approved', 'rejected', 'pending'].includes(status)) {
            return res.status(400).json({ msg: 'Invalid status' });
        }

        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { $set: { status } },
            { new: true }
        );

        if (!application) return res.status(404).json({ msg: 'Application not found' });
        res.json(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
