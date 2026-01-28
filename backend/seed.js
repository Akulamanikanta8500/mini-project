const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/db');
require('dotenv').config(); // Load env vars if needed

const seedData = async () => {
    try {
        // 0. Wait for Connection
        console.log("⏳ Connecting to Database...");
        await connectDB();

        // 1. Clear old data
        console.log("🧹 Clearing old data...");
        await User.deleteMany({});

        // 2. Prepare Password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash("12345", salt);

        // 3. Define the Users
        const users = [
            {
                userId: "ADMIN001",
                password: passwordHash,
                role: "admin",
                firstName: "System",
                lastName: "Admin",
                name: "System Admin"
            },
            {
                userId: "SVU-001",
                password: passwordHash,
                role: "student",
                firstName: "Rahul",
                lastName: "Sharma",
                fatherName: "Rajesh Sharma",
                phone: "9876543210",
                department: "MCA",
                yearOfStudy: "2",
                yearOfAdmission: "2023",
                name: "Rahul Sharma"
            },
            {
                userId: "SVU-002",
                password: passwordHash,
                role: "student",
                firstName: "Priya",
                lastName: "Verma",
                fatherName: "Sures Verma",
                phone: "9123456789",
                department: "MBA",
                yearOfStudy: "1",
                yearOfAdmission: "2024",
                name: "Priya Verma"
            },
            {
                userId: "SVU-003",
                password: passwordHash,
                role: "student",
                firstName: "Amit",
                lastName: "Reddy",
                fatherName: "Karthik Reddy",
                phone: "9988776655",
                department: "ECE",
                yearOfStudy: "3",
                yearOfAdmission: "2022",
                name: "Amit Reddy"
            },
            {
                userId: "SVU-004",
                password: passwordHash,
                role: "student",
                firstName: "Sneha",
                lastName: "Gupta",
                fatherName: "Manish Gupta",
                phone: "8899776655",
                department: "CIVIL",
                yearOfStudy: "4",
                yearOfAdmission: "2021",
                name: "Sneha Gupta"
            },
            {
                userId: "SVU-005",
                password: passwordHash,
                role: "student",
                firstName: "Vikram",
                lastName: "Singh",
                fatherName: "Ranjit Singh",
                phone: "7766554433",
                department: "MECH",
                yearOfStudy: "2",
                yearOfAdmission: "2023",
                name: "Vikram Singh"
            }
        ];

        // 4. Save to Database
        await User.insertMany(users);

        console.log("---------------------------------------");
        console.log("✅ DATA IMPORTED SUCCESSFULLY!");
        console.log("---------------------------------------");
        users.forEach(u => {
            console.log(`👤 ${u.role}: ${u.userId} | Pass: 12345`);
        });
        console.log("---------------------------------------");

        process.exit();
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

seedData();