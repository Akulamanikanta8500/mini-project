import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { FaCheckCircle, FaPrint, FaHome, FaFilePdf } from 'react-icons/fa';

const ApplicationSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Retrieve the data passed from the Form
    const data = location.state || {};

    // Generate a random Application Number for realism
    const appNumber = "TC-" + Math.floor(100000 + Math.random() * 900000);
    const date = new Date().toLocaleDateString();

    // Handle case where user visits this page directly without submitting form
    if (!data.firstName) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                <h3>No Application Data Found</h3>
                <Button onClick={() => navigate('/tc')} variant="primary" className="mt-3">Go to Application Form</Button>
            </div>
        );
    }

    return (
        <div className="py-5" style={{ background: 'white', minHeight: '100vh' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="border-0 shadow-lg rounded-4 overflow-hidden">

                            {/* Header Section */}
                            <div className="bg-success text-white text-center p-5">
                                <FaCheckCircle size={70} className="mb-3 text-white" />
                                <h2 className="fw-bold">Application Submitted!</h2>
                                <p className="mb-0 opacity-75">Your Transfer Certificate request has been received.</p>
                            </div>

                            <Card.Body className="p-5">

                                {/* Reference Number */}
                                <div className="text-center mb-5">
                                    <h6 className="text-uppercase text-muted letter-spacing-1">Application Reference</h6>
                                    <h2 className="fw-bold text-dark">{appNumber}</h2>
                                    <Badge bg="light" text="dark" className="border px-3 py-2 mt-2">
                                        Date: {date}
                                    </Badge>
                                </div>

                                <hr className="my-4 text-muted opacity-25" />

                                {/* Details Section */}
                                <h5 className="fw-bold text-primary mb-4">Application Details</h5>

                                <div className="details-grid">
                                    <Row className="mb-3">
                                        <Col xs={5} className="text-muted fw-semibold">Full Name</Col>
                                        <Col xs={7} className="fw-bold text-dark">{data.firstName} {data.lastName}</Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col xs={5} className="text-muted fw-semibold">Student ID</Col>
                                        <Col xs={7} className="fw-bold text-dark">{data.studentId}</Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col xs={5} className="text-muted fw-semibold">Department</Col>
                                        <Col xs={7} className="fw-bold text-dark">{data.department}</Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col xs={5} className="text-muted fw-semibold">Year of Study</Col>
                                        <Col xs={7} className="fw-bold text-dark">{data.yearOfStudy} Year (Adm: {data.yearOfAdmission})</Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col xs={5} className="text-muted fw-semibold">Phone</Col>
                                        <Col xs={7} className="fw-bold text-dark">{data.phone}</Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col xs={5} className="text-muted fw-semibold">No Dues Cert</Col>
                                        <Col xs={7} className="text-success"><FaFilePdf /> Uploaded</Col>
                                    </Row>
                                </div>

                                <div className="bg-light p-3 rounded-3 mt-4 border border-light">
                                    <small className="text-muted d-block fw-bold mb-1">Reason for TC:</small>
                                    <p className="mb-0 fst-italic text-dark">"{data.reason}"</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="d-grid gap-3 mt-5">
                                    <Button variant="outline-dark" size="lg" onClick={() => window.print()}>
                                        <FaPrint className="me-2" /> Print Receipt
                                    </Button>
                                    <Button variant="primary" size="lg" onClick={() => navigate('/')}>
                                        <FaHome className="me-2" /> Return Home
                                    </Button>
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ApplicationSuccess;