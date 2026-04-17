import React, { useState } from 'react';
import './depts.css'; // Removed this import to fix the error

// --- Placeholder SVGs for Icons ---
// ... (rest of the icon components are unchanged) ...
const IconBook = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-book-half" viewBox="0 0 16 16">
        <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.12 2.503.523 3.388 1.17.884.647 1.449 1.48 1.449 2.343 0 .863-.565 1.695-1.449 2.343-.885.647-2.154 1.05-3.388 1.17-1.33.134-2.458-.063-3.112-.752V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.416C-.63 3.14-.99 4.135-.99 5.037c0 .902.36 1.897 1.27 2.707C1.245 8.567 2.773 9.087 4.287 9.24c1.3.13 2.73.007 3.713-.856V1.783z" />
        <path d="M12.953 9.58c1.33.134 2.458-.063 3.112-.752.884-.647 1.449-1.48 1.449-2.343 0-.863-.565 1.695-1.449 2.343-.885.647-2.154 1.05-3.388 1.17-1.33-.134-2.458.063-3.112.752v7.108c.654-.689 1.782-.886 3.112-.752zM8 9.24c-1.3.13-2.73.007-3.713-.856v7.108c.983.863 2.413.987 3.713.856 1.514-.153 3.042.672 3.994-1.416.91-.71.27-1.705.27-2.707 0-.902-.36 1.897-1.27-2.707C11.042 9.913 9.514 9.393 8 9.24z" />
    </svg>
);

const IconScience = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-display" viewBox="0 0 16 16">
        <path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4v1h3s1 0 1 1H3s1 0 1-1h3v-1H2s-2 0-2-2zm1.398-.855a.75.75 0 0 1 .75-.75h11.704a.75.75 0 0 1 .75.75v1.691A1.75 1.75 0 0 0 13.25 4H2.75A1.75 1.75 0 0 0 1 5.691zM14 5.691V10a1.75 1.75 0 0 1-1.75 1.75H2.75A1.75 1.75 0 0 1 1 10V5.691a.75.75 0 0 1 1.05-.72l.002.002h10.9a.75.75 0 0 1 1.05.72l.002-.002z" />
    </svg>
);

const IconBriefcase = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-briefcase-fill" viewBox="0 0 16 16">
        <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1z" />
        <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z" />
    </svg>
);

const IconScale = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-compass" viewBox="0 0 16 16">
        <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
        <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
    </svg>
);

// NEW Icon for Pharmacy
const IconPharmacy = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-capsule" viewBox="0 0 16 16">
        <path d="M1.828 8.9-3.99 11.02a4 4 0 1 0 5.656 5.658l3.172-3.172a4 4 0 0 0 0-5.656L3.45 4.672a4 4 0 0 0-5.657 0l-1.06 1.06-.001.002 1.06 1.061-.002.002Z" />
        <path d="M12.13 4.96a4 4 0 0 0 0 5.656l3.172 3.172a4 4 0 0 0 5.657-5.657L14.78 4.961a4 4 0 0 0-5.656 0L8.06 6.025l1.06-1.06-.001-.002-1.06-1.06.001-.002Z" />
    </svg>
);


// --- Mock Data for Departments ---

const collegesData = [
    {
        name: "College of Arts",
        desc: "Exploring humanities, social sciences, and the fine arts.",
        icon: <IconBook />,
        color: "blue"
    },
    { // FIX: Was a duplicate College of Engineering. Now College of Sciences.
        name: "College of Sciences",
        desc: "Advancing knowledge in physical, biological, and mathematical sciences.",
        icon: <IconScience />,
        color: "green"
    },
    {
        name: "College of Engineering",
        desc: "Innovating technology and building the future. Home to B.Tech, M.Tech, and more.", // Modified description
        icon: <IconBriefcase />,
        color: "purple"
    },
    { // MODIFIED: Renamed from Commerce to CM & CS
        name: "College of CM & CS",
        desc: "Commerce, Management (MBA), and Computer Science (MCA).",
        icon: <IconScience />, // Changed icon to reflect CS
        color: "orange"
    },
    {
        name: "College of Law",
        desc: "Upholding justice, ethics, and legal education.",
        icon: <IconScale />,
        color: "red"
    },
    { // NEW: Added Pharmacy
        name: "COLLEGE OF PHARMACY",
        desc: "Excellence in pharmaceutical sciences and research.",
        icon: <IconPharmacy />,
        color: "teal"
    },
];

const departmentsData = [
    { id: 1, name: 'CM&CS College', college: 'CM & CS', url: 'https://svuniversity.edu.in/about-cmcs/' },
    { id: 2, name: 'College-of-science', college: '', url: 'https://svuniversity.edu.in/college-of-science/' },
    { id: 3, name: 'College of Atrs', college: '', url: 'https://svuniversity.edu.in/college-of-arts/' },
    { id: 4, name: 'college of Engineering', college: '', url: 'https://svuniversity.edu.in/college-of-engineering/' }


];

// --- The Main Component ---

function DeptsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDepts = departmentsData.filter(dept =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.college.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* All CSS is inlined here to prevent file-not-found errors */}


            <div className="depts-page">
                {/* --- 1. HERO SECTION --- */}
                <div className="depts-hero">
                    <div className="container">


                        <h1 className="mb-3">

                            Colleges & Departments</h1>
                        <p className="lead">Explore the diverse academic landscape of SV University.</p>
                    </div>
                </div>

                {/* --- 2. CREATIVE CAROUSEL SECTION --- */}
                <div className="carousel-section bg-light">
                    <div className="container">
                        <h2 className="mb-4">Our Major Colleges</h2>
                        <div id="collegeCarousel" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">

                                {/* --- SLIDE 1 --- */}
                                <div className="carousel-item active" data-bs-interval="5000">
                                    <div className="row">
                                        {/* Card 1 */}
                                        <div className="col-12 col-md-6 col-lg-4 mb-3">
                                            <div className="card carousel-card text-center p-3">
                                                <div className="card-body">
                                                    <div className={`icon-circle bg-blue mx-auto`}>{collegesData[0].icon}</div>
                                                    <h5 className="card-title mt-3">{collegesData[0].name}</h5>
                                                    <p className="card-text text-muted">{collegesData[0].desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Card 2 */}
                                        <div className="col-12 col-md-6 col-lg-4 mb-3 d-none d-md-block">
                                            <div className="card carousel-card text-center p-3">
                                                <div className="card-body">
                                                    <div className={`icon-circle bg-green mx-auto`}>{collegesData[1].icon}</div>
                                                    <h5 className="card-title mt-3">{collegesData[1].name}</h5>
                                                    <p className="card-text text-muted">{collegesData[1].desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Card 3 */}
                                        <div className="col-12 col-md-6 col-lg-4 mb-3 d-none d-lg-block">
                                            <div className="card carousel-card text-center p-3">
                                                <div className="card-body">
                                                    <div className={`icon-circle bg-purple mx-auto`}>{collegesData[2].icon}</div>
                                                    <h5 className="card-title mt-3">{collegesData[2].name}</h5>
                                                    <p className="card-text text-muted">{collegesData[2].desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* --- SLIDE 2 --- */}
                                <div className="carousel-item" data-bs-interval="5000">
                                    <div className="row">
                                        {/* Card 4 */}
                                        <div className="col-12 col-md-6 col-lg-4 mb-3">
                                            <div className="card carousel-card text-center p-3">
                                                <div className="card-body">
                                                    <div className={`icon-circle bg-orange mx-auto`}>{collegesData[3].icon}</div>
                                                    <h5 className="card-title mt-3">{collegesData[3].name}</h5>
                                                    <p className="card-text text-muted">{collegesData[3].desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Card 5 */}
                                        <div className="col-12 col-md-6 col-lg-4 mb-3 d-none d-md-block">
                                            <div className="card carousel-card text-center p-3">
                                                <div className="card-body">
                                                    <div className={`icon-circle bg-red mx-auto`}>{collegesData[4].icon}</div>
                                                    <h5 className="card-title mt-3">{collegesData[4].name}</h5>
                                                    <p className="card-text text-muted">{collegesData[4].desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* MODIFIED: Added 6th card for Pharmacy */}
                                        <div className="col-12 col-md-6 col-lg-4 mb-3 d-none d-lg-block">
                                            <div className="card carousel-card text-center p-3">
                                                <div className="card-body">
                                                    <div className={`icon-circle bg-teal mx-auto`}>{collegesData[5].icon}</div>
                                                    <h5 className="card-title mt-3">{collegesData[5].name}</h5>
                                                    <p className="card-text text-muted">{collegesData[5].desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Carousel Controls */}
                            <button className="carousel-control-prev" type="button" data-bs-target="#collegeCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#collegeCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- 3. ALL DEPARTMENTS LIST SECTION --- */}
                <div className="departments-list-section">
                    <div className="container">
                        <h2 className="mb-4">All Departments</h2>

                        {/* Search Bar */}
                        <div className="row mb-4">
                            <div className="col-md-8 mx-auto">
                                <input
                                    type="text"
                                    className="form-control search-bar w-100"
                                    placeholder="Search by department or college..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Department List */}
                        <div className="row">
                            <div className="col-lg-10 mx-auto">
                                {filteredDepts.length > 0 ? (
                                    filteredDepts.map(dept => (
                                        <div className="dept-list-item" key={dept.id}>
                                            <div>
                                                <div className="dept-name">{dept.name}</div>
                                                <div className="dept-college">{dept.college}</div>
                                            </div>
                                            {/* --- MODIFIED LINK --- */}
                                            <a
                                                href={dept.url} // Use the url from the data
                                                target="_blank" // Open in a new tab
                                                rel="noopener noreferrer" // Security best practice
                                                className="btn btn-sm btn-outline-danger"
                                                style={{ '--bs-btn-border-color': '#8B0000', '--bs-btn-color': '#8B0000', '--bs-btn-hover-bg': '#8B0000', '--bs-btn-hover-border-color': '#8B0000' }}>
                                                Details
                                            </a>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-muted">No departments found matching your search.</p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default DeptsPage;