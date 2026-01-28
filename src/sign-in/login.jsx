import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaUserGraduate, FaUserShield, FaUniversity, FaLock, FaIdCard } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation Logic
  const redirectPath = location.state?.redirectTo || null;
  const defaultRole = location.state?.role || 'student';
  const isRoleLocked = location.state?.lockRole || false; // Check if we should hide buttons

  const [role, setRole] = useState(defaultRole);
  const [formData, setFormData] = useState({ userId: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Don't forget useEffec

  // ... (keep existing definitions) ...

  // 👇 ADD THIS BLOCK OF CODE 👇
  // This watches for the "timestamp" we added in Nav.jsx
  // When you click a new button, this runs and updates the role immediately.
  useEffect(() => {
    if (location.state?.role) {
      setRole(location.state.role);
    }
  }, [location.state]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { ...formData, role });

      // Save Data for Navbar and Auto-fill
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('name', res.data.user.name);
      localStorage.setItem('user', JSON.stringify(res.data.user)); // <--- Store full object for ApplicationForm 

      // Redirect
      setTimeout(() => {
        if (redirectPath) {
          navigate(redirectPath);
        } else {
          // Unified redirection to Home Page after login
          navigate('/home');
        }
      }, 500);

    } catch (err) {
      setError(err.response?.data?.msg || "Login Failed");
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 overflow-hidden">
      <Row className="h-100">

        {/* Left Side */}
        <Col md={5} lg={4} className="d-none d-md-flex flex-column justify-content-center align-items-center text-white"
          style={{ background: 'linear-gradient(160deg, #002244 0%, #0055aa 100%)' }}>
          <FaUniversity size={80} className="mb-4 text-info" />
          <h2 className="fw-bold">SV University</h2>
          <p className="opacity-75">Secure Access Portal</p>
        </Col>

        {/* Right Side */}
        <Col md={7} lg={8} className="d-flex align-items-center justify-content-center bg-light">
          <div style={{ width: '100%', maxWidth: '450px' }} className="p-4">

            <div className="text-center mb-4">
              <h3 className="fw-bold text-primary">
                {role === 'student' ? 'Student Login' : 'Admin Login'}
              </h3>
              <p className="text-muted">Please sign in to continue</p>
            </div>

            {/* ROLE SWITCHER - HIDDEN IF LOCKED */}
            {!isRoleLocked && (
              <div className="d-flex justify-content-center mb-4 bg-white p-1 rounded-pill shadow-sm border">
                <button className={`btn rounded-pill px-4 w-50 fw-bold ${role === 'student' ? 'btn-primary' : 'btn-light'}`} onClick={() => setRole('student')}>Student</button>
                <button className={`btn rounded-pill px-4 w-50 fw-bold ${role === 'admin' ? 'btn-dark' : 'btn-light'}`} onClick={() => setRole('admin')}>Admin</button>
              </div>
            )}

            {/* BADGE IF LOCKED */}
            {isRoleLocked && (
              <div className="text-center mb-4">
                <span className={`badge ${role === 'student' ? 'bg-primary' : 'bg-dark'} px-3 py-2 rounded-pill`}>
                  {role === 'student' ? <><FaUserGraduate className="me-2" /> Applying for TC</> : <><FaUserShield className="me-2" /> Administrative Access</>}
                </span>
              </div>
            )}

            {error && <Alert variant="danger" className="text-center py-2">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>{role === 'admin' ? 'Admin ID' : 'Roll Number'}</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-white text-primary"><FaIdCard /></span>
                  <Form.Control type="text" name="userId" placeholder={role === 'admin' ? "ADMIN....." : "SVU-60...."} onChange={handleChange} required />
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-white text-primary"><FaLock /></span>
                  <Form.Control type="password" name="password" placeholder="enter password" onChange={handleChange} required />
                </div>
              </Form.Group>

              <Button variant={role === 'student' ? 'primary' : 'dark'} type="submit" className="w-100 fw-bold" disabled={loading}>
                {loading ? <Spinner size="sm" animation="border" /> : "LOGIN"}
              </Button>
            </Form>

          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;