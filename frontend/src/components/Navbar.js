import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav className="navbar">
        <div className="logo">REALTY</div>
        <ul className="nav-links">
            <li><a href="#home">HOME</a></li>
            <li><a href="#projects">PROJECTS</a></li>
            <li><a href="#testimonials">TESTIMONIALS</a></li>
            <li><a href="#contact">CONTACT</a></li>
            <li><Link to="/admin" style={{color: '#ff6600'}}>ADMIN</Link></li>
        </ul>
    </nav>
);
export default Navbar;