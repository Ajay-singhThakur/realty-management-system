import React from 'react';

const ClientCard = ({ client }) => {
    // Dynamic URL logic for Production vs Development
    const API_BASE_URL = window.location.hostname === "localhost" 
        ? "http://localhost:5000" 
        : "https://realty-management-system0101.onrender.com";

    return (
        <div className="card client-card">
            {/* The Quote Logic */}
            <p className="testimonial-text">"{client.description}"</p>
            
            <div className="client-footer">
                {/* The Avatar Logic: Dynamically linking to the backend uploads */}
                <img 
                    src={`${API_BASE_URL}/uploads/${client.image}`} 
                    alt={client.name} 
                    className="avatar" 
                    onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + client.name; }}
                />
                
                <div className="client-info">
                    <h4>{client.name}</h4>
                    <span className="designation">{client.designation}</span>
                </div>
            </div>
        </div>
    );
};

export default ClientCard;