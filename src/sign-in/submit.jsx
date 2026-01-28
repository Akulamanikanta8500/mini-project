import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, ListGroup, Badge, Spinner, Alert, Row, Col, Navbar, Button } from 'react-bootstrap';

 export function StatusPage() {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Helper function to get badge color based on status
  const getBadgeColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'danger';
      case 'Pending':
      default:
        return 'warning';
    }
  };

  useEffect(() => {
    const fetchApplication = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const res = await axios.get('/api/tc/myapplication', config);
        setApplication(res.data);
        setError('');
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data.msg);
        } else {
          setError('Could not fetch application status.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // --- Render Functions ---

  const renderStatusTracker = () => {
    if (!application || !application.clearance) return null;

    // Get the clearance object
    const { clearance } = application;
    
    // Create an array of departments to render
    const departments = [
      { name: 'Library', data: clearance.library },
      { name: 'Physical Dept.', data: clearance.physicalDept },
      { name: 'Hostel', data: clearance.hostel },
      { name: 'Admin Block (Fees)', data: clearance.adminBlock },
    ];

    return (
      <Card className="shadow-sm">
        <Card.Header as="h5">Department Clearance Status</Card.Header>
        <ListGroup variant="flush">
          {departments.map((dept) => (
            <ListGroup.Item key={dept.name}>
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">{dept.name}</span>
                <Badge bg={getBadgeColor(dept.data.status)} pill>
                  {dept.data.status}
                </Badge>
              </div>
              {dept.data.notes && (
                <small className="text-muted fst-italic">
                  Notes: {dept.data.notes}
                </small>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    );
  };

  const renderApplicationDetails = () => {
    if (!application) return null;

    return (
      <Card className="shadow-sm mb-4">
        <Card.Header as="h5">Application Details</Card.Header>
        <Card.Body>
          <Row>
            <Col sm={4}><strong>Student Name:</strong></Col>
            <Col sm={8}>{application.studentName}</Col>
          </Row>
          <Row>
            <Col sm={4}><strong>Student ID:</strong></Col>
            <Col sm={8}>{application.studentId}</Col>
          </Row>
          <Row>
            <Col sm={4}><strong>Date Submitted:</strong></Col>
            <Col sm={8}>
              {new Date(application.dateOfApplication).toLocaleDateString()}
            </Col>
          </Row>
          <hr />
          <div className="text-center">
            <h6 className="mb-3">Overall Application Status</h6>
            <Badge bg={getBadgeColor(application.status)} style={{ fontSize: '1.1rem' }}>
              {application.status}
            </Badge>
          </div>
        </Card.Body>
      </Card>
    );
  };

  // --- Main Return ---

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" className="px-3">
        <Navbar.Brand href="#">SVU Portal</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-light" onClick={handleLogout}>
            Log Out
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-5 mb-5">
        <h2 className="text-center fw-bold mb-4">
          Your Application Status
        </h2>

        {loading && (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p>Loading your application...</p>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && application && (
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              {renderApplicationDetails()}
              {renderStatusTracker()}
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default StatusPage;