import React from 'react';
import './about.css'; // We'll create this file next

// Assuming you have Bootstrap Icons linked in your project
// If not, you can npm install react-bootstrap-icons
import History from './history';
export function About() {
    return (
        <div className="about-svu-page">
            {/* 1. Hero Section */}
            <div className="about-hero text-white text-center">
                <div className="container">
                    <h1 className="display-3 fw-bold">About Sri Venkateswara University</h1>
                    <p className="lead fs-4">Wisdom, Virtue, Knowledge</p>
                </div>
            </div>

            {/* 2. Introduction Section */}
            <div className="container my-5">
                <div className="row g-5 align-items-center">

                    <div >
                        <h2 className="fw-light mb-3">Welcome to SVU</h2>
                        <p className="text-muted fs-5">
                            Founded in 1954, Sri Venkateswara University has grown into a premier
                            institution of higher learning in India, located in the spiritual
                            city of Tirupati.
                        </p>
                        <p className="text-muted">
                            We are committed to academic excellence, cutting-edge research, and
                            fostering a vibrant community of scholars. Our sprawling campus
                            provides a serene and conducive environment for learning,
                            discovery, and personal growth.
                        </p>
                        <a href="/about" className="btn btn-outline-primary mt-3">
                            Read Our History
                        </a>
                    </div>
                </div>
            </div>

            {/* 3. Why Choose SVU? (Creative Cards) */}
            <div className="bg-light py-5">
                <div className="container">
                    <h2 className="text-center mb-5">Why Choose SVU?</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card text-center h-100 p-3 shadow-sm creative-card">
                                <div className="card-body">
                                    <i className="bi bi-award-fill display-4 text-primary mb-3"></i>
                                    <h5 className="card-title">Academic Excellence</h5>
                                    <p className="card-text">
                                        A history of academic rigor, 'A+' accreditation by NAAC, and a
                                        wide array of programs.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center h-100 p-3 shadow-sm creative-card">
                                <div className="card-body">
                                    <i className="bi bi-people-fill display-4 text-primary mb-3"></i>
                                    <h5 className="card-title">Vibrant Campus Life</h5>
                                    <p className="card-text">
                                        A diverse student body with numerous clubs, sports leagues,
                                        and cultural events.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center h-100 p-3 shadow-sm creative-card">
                                <div className="card-body">
                                    <i className="bi bi-lightbulb-fill display-4 text-primary mb-3"></i>
                                    <h5 className="card-title">Research & Innovation</h5>
                                    <p className="card-text">
                                        Cutting-edge research facilities and a strong focus on
                                        fostering innovation and startups.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Call to Action Section */}
            <div className="container text-center my-5 py-5">
                <h2 className="fw-light">Ready to Discover More?</h2>
                <p className="lead text-muted mb-4">
                    Explore our programs, learn about admissions, or plan your visit.
                </p>
                <a href="/admissions" className="btn btn-primary btn-lg me-2">
                    Admissions
                </a>
                <a href="/contact" className="btn btn-outline-secondary btn-lg">
                    Contact Us
                </a>
            </div>
        </div>
    );
};

export default About;