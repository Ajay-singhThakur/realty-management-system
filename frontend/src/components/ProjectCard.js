import React from 'react';

const ProjectCard = ({ project }) => {
    // Dynamic URL logic: ensure images load in both Local and Production
    const API_BASE_URL = window.location.hostname === "localhost" 
        ? "http://localhost:5000" 
        : "https://realty-management-system0101.onrender.com";

    return (
        <div className="project-card-container">
            <div className="project-image-wrapper">
                {/* Dynamically fetching from the backend uploads folder */}
                <img 
                    src={`${API_BASE_URL}/uploads/${project.image}`} 
                    alt={project.name} 
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/450x350?text=Property+Image'; }}
                />
            </div>
            
            <div className="project-content">
                <span className="project-category">Real Estate</span>
                <h3 className="project-title">{project.name}</h3>
                <p className="project-desc">{project.description}</p>
                
                <button className="read-more-btn">VIEW DETAILS</button>
            </div>
        </div>
    );
};

export default ProjectCard;