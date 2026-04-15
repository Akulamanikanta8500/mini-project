import React, { useState, useEffect } from 'react'; // 1. Added useEffect
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Card,
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  Alert,
  Spinner // Added Spinner for loading state
} from 'react-bootstrap';

// Import icons
import {
  FaUniversity,
  FaUserGraduate,
  FaIdCard,
  FaBook,
  FaLightbulb,
  FaFileUpload,
  FaPaperPlane,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaCalendarCheck,
} from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';

// Import the custom CSS
import './ApplicationForm.css';

export function ApplicationForm() {
  const navigate = useNavigate();

  // --- REFACTORED STATE (SINGLE OBJECT) ---
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    phone: '',
    studentId: '',
    department: '',
    yearOfStudy: '',
    yearOfAdmission: ''
  });

  // State for other fields
  const [reason, setReason] = useState('');
  const [file, setFile] = useState(null);
  const [agreed, setAgreed] = useState(false);

  // State for form handling
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // ---------------------------------------------------------
  // 🔒 SECURITY & AUTO-FILL LOGIC
  // ---------------------------------------------------------
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token) {
      navigate('/login', { state: { redirectTo: '/tc', role: 'student' } });
      return;
    }

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log("Auto-filling with user data:", user);

        setFormData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          fatherName: user.fatherName || '',
          phone: user.phone || '',
          studentId: user.userId || '',
          department: user.department || '',
          yearOfStudy: user.yearOfStudy || '',
          yearOfAdmission: user.yearOfAdmission || ''
        });
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
    setIsAuthChecking(false);
  }, [navigate]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // Example logout function
  const handleLogout = () => {
    localStorage.clear(); // Clear token
    navigate('/login');   // Redirect to login
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!agreed) {
      setError('You must agree to the declaration before submitting.');
      setLoading(false);
      return;
    }

    try {
      // 1. Prepare data using FormData for file upload
      const data = new FormData();

      // Append all fields from formData
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      // Append other fields
      data.append('reason', reason);
      if (file) {
        data.append('noDuesFile', file);
      }

      // 2. POST to Backend
      const response = await fetch('/api/applications', {
        method: 'POST',
        body: data // FormData handles boundary automatically
      });

      if (!response.ok) {
        throw new Error('Failed to submit application. Please try again.');
      }

      const savedApplication = await response.json();
      console.log("Application saved:", savedApplication);

      // 3. Success Redirect
      setLoading(false);
      navigate('/success', { state: savedApplication });

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // 🛑 LOADING STATE: Don't show the form while checking if they are logged in
  if (isAuthChecking) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
        <span className="ms-2">Verifying Access...</span>
      </div>
    );
  }

  // ✅ RETURN YOUR EXACT DESIGN
  return (
    <div className="app-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="app-card">
              <div className="app-watermark">
                <img src="/sv_university_logo_new.png" alt="Watermark" className="floating-logo" />
              </div>

              <Card.Header className="app-header">
                <img src="/sv_university_logo_new.png" alt="SV University Logo" className="app-header-icon floating-logo" />
                <h2>SV University</h2>
                <p className="mb-0">Transfer Certificate (TC) Application</p>
              </Card.Header>

              <Card.Body className="p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0">
                    Welcome, <strong>{formData.firstName || 'Student'} {formData.lastName}</strong>
                  </h5>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleLogout}
                  >
                    <BiLogOut /> Logout
                  </Button>
                </div>



                {/* --- APPLICATION FORM --- */}
                <Form onSubmit={handleSubmit}>
                  {/* --- Row 1: Name --- */}
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="form-icon">
                            <FaUserGraduate />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="form-icon">
                            <FaUserGraduate />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* --- Row 2: Father & Phone --- */}
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="fatherName">
                        <Form.Label>Father's Name</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="form-icon">
                            <FaUser />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="Enter father's full name"
                            value={formData.fatherName}
                            onChange={handleInputChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Phone Number</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="form-icon">
                            <FaPhone />
                          </InputGroup.Text>
                          <Form.Control
                            type="tel"
                            placeholder="10-digit mobile number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  <hr className="my-3" />

                  <h5 className="text-muted mb-3">Academic Information</h5>

                  {/* --- Row 3: Academic Info --- */}
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="studentId">
                        <Form.Label>Student ID</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="form-icon">
                            <FaIdCard />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="e.g., 20MCA1234"
                            value={formData.studentId}
                            onChange={handleInputChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="department">
                        <Form.Label>Department</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="form-icon">
                            <FaBook />
                          </InputGroup.Text>
                          <Form.Select
                            id="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="" disabled>Select Department...</option>
                            <option value="MCA">Computer Science (MCA)</option>
                            <option value="MBA">Business Administration (MBA)</option>
                            <option value="ECE">Electronics & Communication</option>
                            <option value="MECH">Mechanical Engineering</option>
                            <option value="CIVIL">Civil Engineering</option>
                            <option value="MSC">M.S.C</option>
                            <option value="others">others</option>
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* --- Row 4: Academic Info --- */}
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="yearOfStudy">
                        <Form.Label>Year of Study</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="form-icon">
                            <FaCalendarAlt />
                          </InputGroup.Text>
                          <Form.Select
                            id="yearOfStudy"
                            value={formData.yearOfStudy}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="" disabled>Select Year...</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="yearOfAdmission">
                        <Form.Label>Year of Admission</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="form-icon">
                            <FaCalendarCheck />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="e.g., 2023"
                            value={formData.yearOfAdmission}
                            onChange={handleInputChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  <hr className="my-3" />

                  {/* --- Full-width fields --- */}
                  <Form.Group className="mb-3" controlId="reason">
                    <Form.Label>Reason for TC</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="form-icon">
                        <FaLightbulb />
                      </InputGroup.Text>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="State your reason for applying for the TC"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="fileUpload">
                    <Form.Label>Upload No Dues Certificate (PDF)</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="form-icon">
                        <FaFileUpload />
                      </InputGroup.Text>
                      <Form.Control
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="declaration">
                    <Form.Check
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      label={
                        <span className="declaration-label">
                          I hereby declare that the information provided above
                          is true to the best of my knowledge.
                        </span>
                      }
                      required
                    />
                  </Form.Group>

                  {/* --- Error and Success Messages --- */}
                  {error && <Alert variant="danger">{error}</Alert>}
                  {success && <Alert variant="success">{success}</Alert>}

                  <div className="d-grid">
                    <Button
                      className="submit-button"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        'Submitting...'
                      ) : (
                        <>
                          <FaPaperPlane /> Submit Application
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ApplicationForm;