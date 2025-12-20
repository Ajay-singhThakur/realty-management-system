import React from 'react';

const ClientCard = ({ client }) => {
    return (
        <div className="card client-card">
            <p className="testimonial-text">"{client.description}"</p>
            <div className="client-footer">
                <img src={`http://localhost:5000/uploads/${client.image}`} alt={client.name} className="avatar" />
                <div className="client-info">
                    <h4>{client.name}</h4>
                    <span className="designation">{client.designation}</span>
                </div>
            </div>
        </div>
    );
};

export default ClientCard;