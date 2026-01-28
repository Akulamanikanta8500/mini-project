import React, { useState, useEffect } from 'react';
// 1. Import Carousel from react-bootstrap
import { Carousel, Card, Badge, Spinner } from 'react-bootstrap';
// 2. Import Link from react-router-dom for navigation
import { Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaFilePdf } from 'react-icons/fa';
// 3. Import the CSS file
import './header.css';

function HomePage() { // Named export to match your App.js import
    const navigate = useNavigate();
    const [tcApplication, setTcApplication] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            if (parsedUser.role === 'student' && parsedUser.userId) {
                fetchStudentTCStatus(parsedUser.userId);
            }
        }
    }, []);

    const fetchStudentTCStatus = async (studentId) => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:5000/api/applications/student/${studentId}`);
            if (res.ok) {
                const data = await res.json();
                setTcApplication(data);
            }
        } catch (err) {
            console.error("Error fetching TC status:", err);
        } finally {
            setLoading(false);
        }
    };

    const renderTCStatusCard = () => {
        if (!tcApplication) return null;

        const { status, _id } = tcApplication;

        if (status === 'pending') {
            return (
                <div className="container mt-4 mb-5">
                    <Card className="shadow-sm border-0 bg-light rounded-4">
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center justify-content-between w-100">
                                <div>
                                    <FaHourglassHalf className="text-warning me-3" size={30} />
                                    <span className="fw-bold">TC Application Status: </span>
                                    <Badge bg="warning" className="text-dark">PENDING</Badge>
                                    <p className="mb-0 mt-1 text-muted small">Your application is currently under review by the administration.</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            );
        }

        if (status === 'approved') {
            return (
                <div className="container mt-4 mb-5">
                    <Card className="shadow-sm border-0 bg-light rounded-4">
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center justify-content-between w-100 flex-wrap gap-3">
                                <div>
                                    <FaCheckCircle className="text-success me-3" size={30} />
                                    <span className="fw-bold">TC Application Status: </span>
                                    <Badge bg="success">APPROVED / GENERATED</Badge>
                                    <p className="mb-0 mt-1 text-muted small">Congratulations! Your Transfer Certificate has been approved and generated.</p>
                                </div>
                                <Link to={"/generate-tc/" + _id} state={tcApplication} className="btn btn-primary d-flex align-items-center">
                                    <FaFilePdf className="me-2" /> View & Print TC
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            );
        }

        if (status === 'rejected') {
            return (
                <div className="container mt-4 mb-5">
                    <Card className="shadow-sm border-0 bg-light rounded-4">
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center justify-content-between w-100">
                                <div>
                                    <FaTimesCircle className="text-danger me-3" size={30} />
                                    <span className="fw-bold">TC Application Status: </span>
                                    <Badge bg="danger">REJECTED</Badge>
                                    <p className="mb-0 mt-1 text-muted small">Your application was rejected. Please contact administration for details.</p>
                                </div>
                                <Link to="/tc" className="btn btn-outline-primary btn-sm">Re-Apply</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="homepage-container">
            {/* ==== 2. CAROUSEL (HERO SECTION) ==== */}
            <Carousel id="heroCarousel">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src='svadm.png'
                        alt="University Main Building"
                    />
                    <Carousel.Caption className="carousel-caption d-none d-md-block">
                        <h5 className="display-4 fw-bold">Welcome to Our University</h5>
                        <p className="fs-5">A Legacy of Excellence in Higher Education.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="library.png"
                        alt="Campus Library"
                    />
                    <Carousel.Caption className="carousel-caption d-none d-md-block">
                        <h5 className="display-4 fw-bold">World-Class Facilities</h5>
                        <p className="fs-5">Explore our state-of-the-art research labs and library.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://placehold.co/1920x600/800000/FFF?text=Graduation+Day"
                        alt="Graduation"
                    />
                    <Carousel.Caption className="carousel-caption d-none d-md-block">
                        <h5 className="display-4 fw-bold">Shape Your Future</h5>
                        <p className="fs-5">Join our community of scholars and innovators.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            {/* TC Status Card for Students */}
            {loading ? (
                <div className="container text-center mt-4">
                    <Spinner animation="border" variant="primary" size="sm" />
                    <span className="ms-2 text-muted small">Checking application status...</span>
                </div>
            ) : renderTCStatusCard()}

            {/* ==== 3. CARDS SECTION (QUICK LINKS) ==== */}
            <div className="container">
                <h2 className="section-heading">Quick Links</h2>
                <div className="row g-4 justify-content-center">

                    {/* CARD 1: Examinations */}
                    <div className="col-md-6 col-lg-3">
                        <div className="card info-card h-100 text-center p-3">
                            <div className="card-icon mt-3">
                                <i className="bi bi-clipboard-check"></i>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Examinations</h5>
                                <p className="card-text">View results, timetables, and notifications from the controller of examinations.</p>
                                <a href="/exams" className="btn btn-primary">Go to Portal</a>
                            </div>
                        </div>
                    </div>

                    {/* CARD 2: Student Portal */}
                    <div className="col-md-6 col-lg-3">
                        <div className="card info-card h-100 text-center p-3">
                            <div className="card-icon mt-3">
                                <i className="bi bi-person-fill"></i>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Student Portal</h5>
                                <p className="card-text">Access your attendance, fee payments, and personal academic details.</p>
                                <Link to="/login" className="btn btn-primary">Login Now</Link>
                            </div>
                        </div>
                    </div>

                    {/* CARD 3: Library */}
                    <div className="col-md-6 col-lg-3">
                        <div className="card info-card h-100 text-center p-3">
                            <div className="card-icon mt-3">
                                <i className="bi bi-book-half"></i>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Digital Library</h5>
                                <p className="card-text">Browse our vast collection of e-books, journals, and research papers.</p>
                                <a href="/library" className="btn btn-primary">Access Library</a>
                            </div>
                        </div>
                    </div>

                    {/* CARD 4: Academics */}
                    <div className="col-md-6 col-lg-3">
                        <div className="card info-card h-100 text-center p-3">
                            <div className="card-icon mt-3">
                                <i className="bi bi-journals"></i>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Academics</h5>
                                <p className="card-text">Explore our diverse range of programs, syllabus, and academic calendars.</p>
                                <a href="/academics" className="btn btn-primary">View Programs</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ==== 4. WELCOME & NEWS SECTION ==== */}
            <div className="container my-5">
                <div className="row g-5">

                    {/* Column 1: Welcome Message */}
                    <div className="col-lg-7">
                        <div className="welcome-section p-4 p-md-5 rounded-3 shadow-sm h-100">
                            <h2 className="display-5 fw-bold lh-1">From the Vice-Chancellor's Desk</h2>
                            <p className="lead mt-4">"Welcome to our University, a place where bright minds converge. Our mission is to foster innovation, critical thinking, and a passion for learning. We are dedicated to providing a transformative educational experience..."</p>
                            <img src="https://placehold.co/150x150/EEEEEE/333?text=VC" alt="Vice-Chancellor" className="vc-photo rounded-circle float-start me-3" />
                            <p className="fw-bold mb-0 mt-3">Prof.  Akula Manikanta</p>
                            <p className="text-muted">Vice-Chancellor</p>
                        </div>
                    </div>

                    {/* Column 2: News & Announcements */}
                    <div className="col-lg-5">
                        <div className="news-section p-4 p-md-5 rounded-3 shadow-sm h-100">
                            <h2 className="news-heading">News & Announcements</h2>
                            <ul className="list-unstyled news-list mt-4">
                                <li className="news-item">
                                    <span className="news-date">15 NOV 2025</span>
                                    <a href="/">MCA II Semester results declared.</a>
                                    <span className="new-badge">New</span>
                                </li>
                                <li className="news-item">
                                    <span className="news-date">14 NOV 2025</span>
                                    {/* 4. FIXED: Use <Link> for React Router navigation */}
                                    <Link to="/tc">Apply for Transfer Cirtificate(TC) Notification for 2025-26.</Link>
                                </li>
                                <li className="news-item">
                                    <span className="news-date">12 NOV 2025</span>
                                    <a href="/">Workshop on "Full Stack Development with Java" on Nov 20th.</a>
                                </li>
                                <li className="news-item">
                                    <span className="news-date">10 NOV 2025</span>
                                    <a href="/">Annual Sports Meet to be held from Dec 1st to Dec 3rd.</a>
                                </li>
                                <li className="news-item">
                                    <span className="news-date">08 NOV 2025</span>
                                    <a href="/">Last date for examination fee payment extended.</a>
                                </li>
                            </ul>
                            <a href="/all-news" className="btn btn-outline-primary mt-3">View All News</a>
                        </div>
                    </div>

                </div>
            </div>

            {/* ==== 5. FOOTER ==== */}
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
                            <h5 className="fw-bold"><i className="bi bi-bank"></i> University Name</h5>
                            <p>City, State<br />India - PinCode</p>
                        </div>
                        <div className="col-md-4 text-center mb-3 mb-md-0">
                            <h5>Useful Links</h5>
                            <ul className="list-unstyled">
                                <li><a href="/webmail">Webmail</a></li>
                                <li><a href="/alumni">Alumni</a></li>
                                <li><a href="/grievance">Grievance Cell</a></li>
                                <li><a href="/careers">Careers</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4 text-center text-md-end">
                            <h5>Connect</h5>
                            {/* 5. Added back the styling classes to the social links */}
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="fs-4 me-2">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="fs-4 me-2">
                                <i className="bi bi-twitter-x"></i>
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="fs-4 me-2">
                                <i className="bi bi-linkedin"></i>
                            </a>
                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="fs-4">
                                <i className="bi bi-youtube"></i>
                            </a>
                        </div>
                    </div>
                    <hr className="my-3" />
                    <div className="text-center">
                        <p className="mb-0">&copy; 2025 University Name. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>

        </div>
    );
}

export default HomePage;