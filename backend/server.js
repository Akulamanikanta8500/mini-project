const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import Step 2
const authRoutes = require('./routes/auth');
const applicationsRoutes = require('./routes/applications');
const path = require('path');

const app = express();

// 1. Connect to Database
connectDB();

// 2. Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 3. DEFINE ROUTES
// This creates the path: http://localhost:5000/api/auth/login
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on Port ${PORT}`);
});