const axios = require('axios');

async function testLogin() {
    try {
        console.log("Testing Student Login (SVU-001)...");
        const res = await axios.post('http://localhost:5000/api/auth/login', {
            userId: 'SVU-001',
            password: '12345',
            role: 'student'
        });
        console.log("Response Keys:", Object.keys(res.data.user));
        console.log("Full User Object:", JSON.stringify(res.data.user, null, 2));
    } catch (err) {
        console.error("Login Failed:", err.response?.data || err.message);
    }
}

testLogin();
