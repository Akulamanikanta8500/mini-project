const mongoose = require('mongoose');

// REPLACE THIS STRING WITH YOUR REAL ATLAS CONNECTION STRING
// Ensure you replace <password> with your real password
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://akulamani8500_db_user:hYqCahcvPG13w2i4@cluster0.aa918il.mongodb.net/tc_portal_db?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;