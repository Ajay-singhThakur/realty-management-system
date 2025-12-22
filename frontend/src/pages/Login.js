import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
    const [creds, setCreds] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const API_BASE_URL = window.location.hostname === "localhost" 
        ? "http://localhost:5000" 
        : "https://realty-management-system0101.onrender.com";

   const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${API_BASE_URL}/api/login`, creds);
        
        // We check if the backend sent success: true
        if (res.data && res.data.success === true) {
            console.log("Login Successful, setting flag...");
            
            // 1. Set the flag in the browser
            localStorage.setItem('isAdmin', 'true'); 
            
            // 2. Redirect to admin
            navigate('/admin');
            
            // 3. Force a refresh to make sure App.js sees the new localStorage
            window.location.reload(); 
        } else {
            alert("Invalid Credentials");
        }
    } catch (err) {
        console.error("Login Error:", err);
        alert("Server error or wrong credentials");
    }
};

    return (
        <div className="login-root">
            <div className="login-card">
                <h2>REALTY<span>OS</span></h2>
                <p>Administrative Control Center</p>
                <form onSubmit={handleLogin}>
                    <div className="login-group">
                        <label>Identity</label>
                        <input type="text" placeholder="Username" 
                            onChange={e => setCreds({...creds, username: e.target.value})} required />
                    </div>
                    <div className="login-group">
                        <label>Security Key</label>
                        <input type="password" placeholder="••••••••" 
                            onChange={e => setCreds({...creds, password: e.target.value})} required />
                    </div>
                    <button type="submit" className="login-submit">Authenticate →</button>
                </form>
            </div>
        </div>
    );
}