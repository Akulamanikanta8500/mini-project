import React from 'react';
// import './history.css'; // Removed: Styles are now inline
// import { PlayFill } from 'react-bootstrap-icons'; // Removed: Using inline SVG
import { Link } from 'react-router-dom'; // FIX: Added missing import

export function History() {
    const historyEvents = [
        {
            year: "1954",
            title: "Founding and Inauguration",
            description: "Sri Venkateswara University was established in 1954, an initiative by the then Chief Minister of Andhra Pradesh, Sri Tanguturi Prakasam Pantulu. It was envisioned as a center of excellence in higher education for the region.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/S_V_University_Tirupati_Main_Building.JPG/1280px-S_V_University_Tirupati_Main_Building.JPG", // Placeholder
            color: "blue"
        },
        {
            year: "1956",
            title: "First Academic Programs",
            description: "The university began with a modest number of departments, focusing on arts, science, and commerce. Early academic programs laid the foundation for its multidisciplinary approach.",
            image: "https://svuniversity.edu.in/storage/2023/11/slider-4.jpg", // Placeholder
            color: "green"
        },
        {
            year: "1960s-1970s",
            title: "Expansion and Growth",
            description: "Witnessed significant expansion with the establishment of new faculties like Engineering, Medicine, and Law. Infrastructure development accelerated, including new academic buildings and hostels.",
            image: "https://svuniversity.edu.in/storage/2023/11/slider-2.jpg", // Placeholder
            color: "purple"
        },
        {
            year: "1980s-1990s",
            title: "Research and Recognition",
            description: "Became a hub for research in various fields, attracting scholars from across the nation. Achieved national and international recognition for its contributions to science and humanities.",
            image: "https://svuniversity.edu.in/storage/2023/11/slider-1.jpg", // Placeholder
            color: "orange"
        },
        {
            year: "2000s-Present",
            title: "Modernization and Innovation",
            description: "Embraced technological advancements and modern pedagogical approaches. Focused on interdisciplinary research, collaborations with industries, and fostering an entrepreneurial spirit among students.",
            image: "https://svuniversity.edu.in/storage/2023/11/gallery-4.jpg", // Placeholder
            color: "red"
        },
    ];

    return (
        <>
            {/* FIX: Inlined all CSS to remove the './history.css' import error */}
            <style>
                {`
          /* Import a clean, modern font (optional) */
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Playfair+Display:wght@700&display=swap');

          .svu-history-page {
            font-family: 'Montserrat', sans-serif;
            background-color: #f8f9fa; /* Light background */
            animation: fadeInPage 1s ease-out;
          }

          /* Hero Section */
          .history-hero {
            background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
              url('https://svuniversity.edu.in/storage/2023/11/slider-4.jpg'); 
            background-size: cover;
            background-position: center;
            padding: 100px 0;
            border-bottom-left-radius: 50% 10%;
            border-bottom-right-radius: 50% 10%;
            position: relative;
            overflow: hidden; 
          }

          .history-hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(139, 0, 0, 0.6); /* Maroon overlay */
            z-index: 0;
          }

          .history-hero .container {
            position: relative;
            z-index: 1; 
          }

          .history-hero h1 {
            font-family: 'Playfair Display', serif;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          }

          .fancy-heading {
            font-family: 'Playfair Display', serif;
            color: #333;
            position: relative;
            margin-bottom: 3rem;
          }
          .fancy-heading::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: -15px;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background-color: #8B0000; /* Maroon accent */
            border-radius: 2px;
          }

          .history-intro-text {
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
            font-size: 1.1rem;
            line-height: 1.8;
            color: #555;
          }


          /* Timeline Styling */
          .timeline {
            position: relative;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 10px;
          }

          .timeline::after {
            content: '';
            position: absolute;
            width: 4px;
            background-color: #dee2e6; /* Light gray line */
            top: 0;
            bottom: 0;
            left: 50%;
            margin-left: -2px;
            z-index: 0; 
          }

          .timeline-item {
            padding: 10px 40px;
            position: relative;
            background-color: inherit;
            width: 50%;
            margin-bottom: 50px; 
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            z-index: 1; 
          }

          .timeline-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
          }

          .timeline-icon {
            position: absolute;
            width: 40px;
            height: 40px;
            right: -20px; 
            background-color: #8B0000; /* Maroon dot */
            border: 4px solid #fff; 
            top: 30px; 
            border-radius: 50%;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
            box-shadow: 0 0 0 3px rgba(139, 0, 0, 0.4); 
            animation: pulse 1.5s infinite alternate;
          }

          .timeline-item.left .timeline-icon {
            left: -20px;
          }

          .timeline-content {
            padding: 20px;
            background-color: #fff;
            border-radius: 6px;
            position: relative;
            min-height: 150px; 
          }

          .timeline-content h3 {
            color: #333;
            margin-bottom: 10px;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
          }
          .timeline-content p {
            color: #666;
            line-height: 1.6;
          }

          .timeline-year {
            display: block;
            font-weight: 700;
            font-size: 1.4rem;
            margin-bottom: 10px;
            color: #8B0000; /* Maroon year */
          }

          .left { left: 0; }
          .right { left: 50%; }

          .left::before {
            content: " ";
            height: 0;
            position: absolute;
            top: 22px;
            width: 0;
            z-index: 1;
            right: 30px;
            border: medium solid white;
            border-width: 10px 0 10px 10px;
            border-color: transparent transparent transparent white;
          }

          .right::before {
            content: " ";
            height: 0;
            position: absolute;
            top: 22px;
            width: 0;
            z-index: 1;
            left: 30px;
            border: medium solid white;
            border-width: 10px 10px 10px 0;
            border-color: transparent white transparent transparent;
          }

          /* Colorful Section Backgrounds */
          .bg-blue-section { background-color: #e0f2f7; } 
          .bg-green-section { background-color: #e6f7e0; } 
          .bg-purple-section { background-color: #f3e0f7; } 
          .bg-orange-section { background-color: #f7ede0; } 
          .bg-red-section { background-color: #f7e0e0; } 


          /* Call to Action Section */
          .colorful-cta {
            background: linear-gradient(45deg, #8B0000, #B22222); /* Maroon to Firebrick gradient */
            padding: 80px 0;
            border-top-left-radius: 50% 10%;
            border-top-right-radius: 50% 10%;
            margin-top: 5rem;
          }

          .colorful-cta h2 {
            font-family: 'Playfair Display', serif;
            color: white;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
          }

          .colorful-cta-btn {
            color: #8B0000 !important; /* Maroon text on light button */
            font-weight: 600;
            transition: all 0.3s ease;
          }
          .colorful-cta-btn:hover {
            background-color: #f0f0f0;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          }


          /* Animations */
          @keyframes fadeInPage {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 0, 0, 0.4); }
            70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(139, 0, 0, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 0, 0, 0); }
          }

          /* Responsive adjustments */
          @media screen and (max-width: 768px) {
            .timeline::after {
              left: 31px; /* Align line to left for mobile */
            }
            .timeline-item {
              width: 100%;
              padding-left: 70px; /* Space for the line */
              padding-right: 25px;
              left: 0; /* All items on left */
              margin-bottom: 30px;
            }
            .timeline-item.right::before,
            .left::before {
              border: medium solid white;
              border-width: 10px 10px 10px 0;
              border-color: transparent white transparent transparent;
              left: 60px; /* Arrow points from content to line */
              right: auto;
            }
            .timeline-icon {
              left: 15px; /* Icon on the left */
              right: auto;
              top: 30px;
            }
            .history-hero {
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
            }
            .colorful-cta {
              border-top-left-radius: 0;
              border-top-right-radius: 0;
            }
          }
        `}
            </style>
            <div className="svu-history-page">
                <div className="history-hero text-white text-center py-5">
                    <div className="container">
                        <h1 className="display-4 fw-bold">Our Illustrious Journey</h1>
                        <p className="lead fs-5">Tracing the legacy of Sri Venkateswara University</p>
                    </div>
                </div>

                <div className="container py-5">
                    <h2 className="text-center mb-5 fancy-heading">A Legacy of Excellence</h2>
                    <p className="text-center text-muted mb-5 history-intro-text">
                        From its humble beginnings in the mid-20th century, Sri Venkateswara University has grown to become a beacon of knowledge and innovation. Explore the key milestones that shaped our journey.
                    </p>

                    <div className="timeline">
                        {historyEvents.map((event, index) => (
                            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} bg-${event.color}-section`}>
                                <div className="timeline-content">
                                    <span className="timeline-year">{event.year}</span>
                                    <h3>{event.title}</h3>
                                    <p>{event.description}</p>
                                    {event.image && (
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="img-fluid rounded shadow-sm mt-3"
                                            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/8B0000/white?text=${event.title}`; }}
                                        />
                                    )}
                                </div>
                                <div className="timeline-icon">
                                    {/* FIX: Replaced <PlayFill /> with an inline SVG */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                                        <path d="m11.596 8.697-6.363 3.672a.5.5 0 0 1-.5.012l-.001-.001a.5.5 0 0 1-.252-.434V4.053a.5.5 0 0 1 .502-.498l6.363 3.672a.5.5 0 0 1 0 .894z" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="colorful-cta py-5 text-white text-center">
                    <div className="container">
                        <h2 className="display-6 mb-3">Be a Part of Our Future</h2>
                        <p className="lead">Join a legacy of learning, discovery, and impact.</p>
                        {/* This Link component will now work because we imported it at the top.
              Note: I've changed the link to "/admissions" as "Apply Now"
              usually goes to admissions, but you can change it back to "/about"
              if you prefer.
            */}
                        <Link to="/about" className="btn btn-light btn-lg mt-3 colorful-cta-btn">
                            Apply Now
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default History;