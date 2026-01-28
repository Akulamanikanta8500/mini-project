const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fatherName: { type: String },
    phone: { type: String, required: true },
    studentId: { type: String, required: true },
    department: { type: String, required: true },
    yearOfStudy: { type: String, required: true },
    yearOfAdmission: { type: String, required: true },
    reason: { type: String, required: true },
    noDuesFile: { type: String }, // Store filename or path
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    applicationNumber: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now }
});

// Middleware to generate application number before saving
applicationSchema.pre('save', function () {
    if (!this.applicationNumber) {
        this.applicationNumber = "TC-" + Math.floor(100000 + Math.random() * 900000);
    }
});

module.exports = mongoose.model('Application', applicationSchema);
