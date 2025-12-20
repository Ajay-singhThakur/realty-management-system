import React from 'react';

const ProjectCard = ({ project }) => {
    return (
        <div className="project-card-container">
            {/* Displaying Project Image fetched from backend [cite: 11, 13] */}
            <div className="project-image-wrapper">
                <img src={`http://localhost:5000/uploads/${project.image}`} alt={project.name} />
            </div>
            
            <div className="project-content">
                {/* Labels like 'Consultation' can be static or dynamic [cite: 18, 21] */}
                <span className="project-category">Consultation</span>
                
                {/* Project Name  */}
                <h3 className="project-title">{project.name}</h3>
                
                {/* Project Description  */}
                <p className="project-desc">{project.description}</p>
                
                {/* Non-functional Read More button [cite: 16, 20, 25] */}
                <button className="read-more-btn" disabled>READ MORE</button>
            </div>
        </div>
    );
};

export default ProjectCard;