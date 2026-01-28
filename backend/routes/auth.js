const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/login', async (req, res) => {
    try {
        const { userId, password, role } = req.body;

        // 1. Check User
        // 1. Check User
        const user = await User.findOne({ userId });
        if (!user) return res.status(400).json({ msg: "User ID not found" });

        // 2. Check Role (Loose check or exact check)
        if (role && user.role !== role) {
            return res.status(400).json({ msg: `Role Mismatch! This ID belongs to a ${user.role}` });
        }

        // 3. Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Password" });

        // 4. Send Token & User Details
        const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });

        const userPayload = {
            userId: user.userId,
            role: user.role,
            name: user.name,
            // Student specific fields
            firstName: user.firstName,
            lastName: user.lastName,
            fatherName: user.fatherName,
            phone: user.phone,
            department: user.department,
            yearOfStudy: user.yearOfStudy,
            yearOfAdmission: user.yearOfAdmission
        };

        res.json({
            token,
            user: userPayload
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;