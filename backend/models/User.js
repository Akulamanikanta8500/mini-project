const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Student ID or Admin ID
    password: { type: String, required: true },
    role: { type: String, required: true }, // 'student' or 'admin'

    // Student Information
    firstName: { type: String },
    lastName: { type: String },
    fatherName: { type: String },
    phone: { type: String },

    // Academic Info
    department: { type: String },
    yearOfStudy: { type: String },
    yearOfAdmission: { type: String },

    // Legacy/Generic fields
    name: { type: String } // Keeping for backward compatibility or simple admin name
});

module.exports = mongoose.model('User', userSchema);