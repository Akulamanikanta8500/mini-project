import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, Spinner, Alert } from 'react-bootstrap';
import { FaPrint, FaArrowLeft, FaUniversity, FaCheckCircle } from 'react-icons/fa';
import './TransferCertificate.css';

const TransferCertificate = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(!location.state);
    const [error, setError] = useState(null);
    const [tcData, setTcData] = useState(location.state || null);

    useEffect(() => {
        // If we don't have data from navigation state, fetch it from backend
        if (!tcData && id) {
            const fetchTcData = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/applications/${id}`);
                    if (!response.ok) throw new Error('Could not fetch TC data');
                    const data = await response.json();
                    setTcData(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchTcData();
        }
    }, [id, tcData]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" variant="primary" />
            <span className="ms-3">Preparing Certificate...</span>
        </Container>
    );

    if (error || !tcData) return (
        <Container className="py-5">
            <Alert variant="danger">
                <h4>Error Loading Certificate</h4>
                <p>{error || "No data available for this TC."}</p>
                <Button onClick={() => navigate('/admn')} variant="outline-danger">Back to Dashboard</Button>
            </Alert>
        </Container>
    );

    return (
        <div className="tc-page-wrapper py-5">
            {/* Action Bar (Hidden during print) */}
            <div className="action-bar no-print mb-4 d-flex justify-content-center gap-3">
                <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                    <FaArrowLeft className="me-2" /> Back
                </Button>
                <Button variant="primary" onClick={handlePrint}>
                    <FaPrint className="me-2" /> Print Certificate
                </Button>
            </div>

            {/* The Certificate Document */}
            <div className="tc-document mx-auto bg-white shadow-lg p-5">
                {/* Border Decoration */}
                <div className="tc-border-outer">
                    <div className="tc-border-inner p-5">

                        {/* Header */}
                        <div className="tc-header text-center mb-5">
                            <div className="tc-logo-container mb-3">
                                <img src="/sv_university_logo.png" alt="SV University Logo" className="tc-university-logo" />
                            </div>
                            <h1 className="university-name fw-bold">SRI VENKATESWARA UNIVERSITY</h1>
                            <h5 className="university-address text-muted">TIRUPATI - 517 502, ANDHRA PRADESH, INDIA</h5>
                            <div className="accreditation-badge mt-2">
                                <span className="badge-text">Accredited by NAAC with 'A+' Grade</span>
                            </div>
                            <hr className="header-divider mt-4" />
                            <h2 className="tc-title mt-4">TRANSFER CERTIFICATE</h2>
                        </div>

                        {/* Certificate Body */}
                        <div className="tc-body mt-5">
                            <div className="tc-meta-row d-flex justify-content-between mb-4">
                                <p><strong>TC No:</strong> {tcData.applicationNumber || 'TC-' + Math.floor(Math.random() * 10000)}</p>
                                <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                            </div>

                            <p className="tc-text leading-loose">
                                This is to certify that <strong>{tcData.firstName} {tcData.lastName}</strong>,
                                Son of <strong>{tcData.fatherName || '________________'}</strong>,
                                was a student of this University in the Department of
                                <strong> {tcData.department}</strong>.
                            </p>

                            <table className="table mt-4 tc-info-table">
                                <tbody>
                                    <tr>
                                        <td className="fw-bold" width="40%">Student ID / Roll No:</td>
                                        <td className="tc-field-value">{tcData.studentId}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Father / Mother / Guardian:</td>
                                        <td className="tc-field-value text-uppercase">{tcData.fatherName || 'Not Provided'}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Nationality & Religion:</td>
                                        <td className="tc-field-value">INDIAN</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Department / Course:</td>
                                        <td className="tc-field-value">{tcData.department}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Date of Admission:</td>
                                        <td className="tc-field-value">{tcData.yearOfAdmission}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Class/Year at time of leaving:</td>
                                        <td className="tc-field-value">{tcData.yearOfStudy} Year</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Reason for leaving:</td>
                                        <td className="tc-field-value text-uppercase">{tcData.reason || 'COURSE COMPLETED'}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Conduct & Character:</td>
                                        <td className="tc-field-value">EXEMPLARY / GOOD</td>
                                    </tr>
                                </tbody>
                            </table>

                            <p className="mt-5 tc-declaration">
                                He/She has paid all dues to the University and his/her name has been removed
                                from the rolls of the University effective from the date of this certificate.
                            </p>
                        </div>

                        {/* Footer / Signatures */}
                        <div className="tc-footer d-flex justify-content-between mt-10 align-items-end pt-5">
                            <div className="signature-box text-center">
                                <div className="signature-line mb-2 w-150"></div>
                                <p className="mb-0 fw-bold">Clerk</p>
                            </div>
                            <div className="seal-box">
                                <div className="university-seal">UNIVERSITY SEAL</div>
                            </div>
                            <div className="signature-box text-center">
                                <div className="signature-line mb-2 w-150"></div>
                                <p className="mb-0 fw-bold">Registrar / Principal</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="tc-watermark">
                    <img src="/sv_university_logo.png" alt="Watermark" />
                </div>
            </div>

            <div className="print-footer no-print text-center mt-4 text-muted small">
                © 2025 Sri Venkateswara University - Official Document
            </div>
        </div>
    );
};

export default TransferCertificate;
