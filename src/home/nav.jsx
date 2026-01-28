import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import {
    FaUniversity,
    FaUserCircle,
    FaSignOutAlt,
    FaHome,
    FaFileAlt,
    FaUserGraduate,
    FaBuilding,
    FaPhone,
    FaAddressCard
} from 'react-icons/fa';

const CustomNav = () => {
    const navigate = useNavigate();

    // Get User Info from Storage
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('name') || 'User';
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    // 🔒 STRICT NAVIGATION HANDLER
    const handleProtectedClick = (path, requiredRole) => {
        // 1. If logged in with CORRECT role, go to page
        if (token && role === requiredRole) {
            navigate(path);
        }
        // 2. If logged in with WRONG role, warn them
        else if (token && role !== requiredRole) {
            alert(`Access Denied. You are logged in as a ${role}, but this page is for ${requiredRole}s.`);
        }
        // 3. If NOT logged in (or need to switch modes), force Login with Locked Role
        else {
            navigate('/login', {
                state: {
                    role: requiredRole,
                    redirectTo: path,
                    lockRole: true,
                    // ⚡ TRICK: Add a timestamp so React knows this is a NEW click 
                    // even if we are already on the login page!
                    timestamp: Date.now()
                }
            });
        }
    };

    return (
        <Navbar expand="lg" variant="dark" sticky="top" style={{ background: 'linear-gradient(90deg, #002244 0%, #0055aa 100%)' }}>
            <Container fluid className="px-4">

                {/* BRAND LOGO */}
                <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center">
                    <FaUniversity className="me-2 text-warning" size={24} />
                    <span style={{ letterSpacing: '1px' }}>SV PORTAL</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />

                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto align-items-center">

                        {/* 1. HOME */}
                        <Nav.Link as={Link} to="/" className="d-flex align-items-center me-3">
                            <FaHome className="me-1" /> Home
                        </Nav.Link>

                        {/* 2. APPLY TC (Forces Student) */}
                        <Nav.Link
                            onClick={() => handleProtectedClick('/tc', 'student')}
                            className="d-flex align-items-center me-3"
                            style={{ cursor: 'pointer' }}
                        >
                            <FaFileAlt className="me-1" /> Apply TC
                        </Nav.Link>

                        {/* 3. ADMISSIONS (Forces Admin) */}
                        <Nav.Link
                            onClick={() => handleProtectedClick('/admn', 'admin')}
                            className="d-flex align-items-center me-3"
                            style={{ cursor: 'pointer' }}
                        >
                            <FaUserGraduate className="me-1" /> Admissions
                        </Nav.Link>

                        {/* 4. DEPARTMENTS */}
                        <Nav.Link as={Link} to="/depts" className="d-flex align-items-center me-3">
                            <FaBuilding className="me-1" /> Departments
                        </Nav.Link>

                        {/* 5. CONTACT */}
                        <Nav.Link as={Link} to="/about" className="d-flex align-items-center me-3">
                            <FaAddressCard className="me-1" /> About
                        </Nav.Link>

                        {/* PROFILE / LOGIN SECTION */}
                        {token ? (
                            <NavDropdown
                                title={<span><FaUserCircle className="me-1" /> {userName}</span>}
                                id="user-dropdown"
                                align="end"
                                className="ms-3 bg-blue rounded-pill px-2 text-dark"
                            >
                                <NavDropdown.Item as={Link} to={role === 'admin' ? "/admn" : "/tc"}>
                                    Dashboard
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                                    <FaSignOutAlt className="me-2" /> Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Button
                                variant="warning"
                                size="sm"
                                className="ms-3 fw-bold rounded-pill px-4 d-flex align-items-center"
                                as={Link}
                                to="/login"
                            >
                                Login
                            </Button>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNav;