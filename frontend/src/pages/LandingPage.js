import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Landing.css';

export default function LandingPage() {
    // 1. Set your base URL here so it's easy to change later
    const BASE_URL = "https://realty-management-system0101.onrender.com";
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [contact, setContact] = useState({ fullName: '', email: '', mobile: '', city: '' });
    const [subEmail, setSubEmail] = useState('');

    useEffect(() => {
        const fetchContent = async () => {
            try {
                // Use the BASE_URL here
                const pRes = await axios.get(`${BASE_URL}/api/projects`);
                const cRes = await axios.get(`${BASE_URL}/api/clients`);
                setProjects(pRes.data);
                setClients(cRes.data);
            } catch (err) {
                console.error("Error fetching data from Render:", err);
            }
        };
        fetchContent();
    }, []);
/*
    useEffect(() => {
        const fetchContent = async () => {
            const pRes = await axios.get('http://localhost:5000/api/projects');
            const cRes = await axios.get('http://localhost:5000/api/clients');
            setProjects(pRes.data);
            setClients(cRes.data);
        };
        fetchContent();
    }, []);
*/
/*
    const handleContact = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/contact', contact);
        alert("Inquiry Sent Successfully!");
        setContact({ fullName: '', email: '', mobile: '', city: '' });
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/subscribe', { email: subEmail });
        alert("Subscribed to Newsletter!");
        setSubEmail('');
    };
*/
const handleContact = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/api/contact`, contact);
            alert("Inquiry Sent Successfully!");
            setContact({ fullName: '', email: '', mobile: '', city: '' });
        } catch (err) { alert("Error sending inquiry."); }
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/api/subscribe`, { email: subEmail });
            alert("Subscribed to Newsletter!");
            setSubEmail('');
        } catch (err) { alert("Subscription failed."); }
    };
    return (
        <div className="lp-root">
            {/* NAVIGATION */}
            <nav className="lp-nav">
                <div className="lp-logo">REALTY<span>OS</span></div>
                <div className="lp-menu">
                    <a href="#home">Home</a>
                    <a href="#projects">Our Projects</a>
                    <a href="#clients">Clients</a>
                    <a href="#contact">Contact</a>
                    <a href="/admin" className="lp-admin-btn">Admin Portal</a>
                </div>
            </nav>

            {/* HERO SECTION */}
            <header id="home" className="lp-hero">
                <div className="lp-hero-text">
                    <span className="lp-tag">Premium Real Estate</span>
                    <h1>Not Your Average <span>Realtor</span></h1>
                    <p>Experience architectural excellence and luxury living with RealtyOS.</p>
                    <div className="lp-hero-btns">
                        <a href="#projects" className="lp-btn-primary">View Portfolio</a>
                        <a href="#contact" className="lp-btn-outline">Free Consultation</a>
                    </div>
                </div>
                <div className="lp-hero-visual">
                    <div className="lp-glass-card">
                        <h3>Discover Luxury</h3>
                        <p>Modern Living Redefined.</p>
                    </div>
                </div>
            </header>

            {/* OUR PROJECTS SECTION */}
            <section id="projects" className="lp-section">
                <div className="lp-sec-header">
                    <h2>Our Projects</h2>
                    <p>Explore our latest architectural masterpieces</p>
                </div>
                <div className="lp-project-grid">
                    {projects.map(p => (
                        <div className="lp-project-card" key={p._id}>
                            <div className="lp-p-img">
                               {/* <img src={`http://localhost:5000/uploads/${p.image}`} alt={p.name} /> */}
                               <img src={`${API_BASE_URL}/uploads/${p.image}`} alt={p.name} />
                                <div className="lp-p-badge">Featured</div>
                            </div>
                            <div className="lp-p-info">
                                <h3>{p.name}</h3>
                                <p>{p.description}</p>
                                <button className="lp-dummy-btn">READ MORE</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* HAPPY CLIENTS SECTION */}
<section id="clients" className="lp-section lp-bg-dark">
    <div className="lp-sec-header white">
        <span className="lp-mini-tag">Success Stories</span>
        <h2>Happy Clients</h2>
        <p>Join 500+ homeowners who found their masterpiece with us.</p>
    </div>
    
    <div className="lp-client-grid-enhanced">
        {clients.map(c => (
            <div className="lp-client-card-pro" key={c._id}>
                <div className="lp-card-upper">
                    <div className="lp-rating">⭐⭐⭐⭐⭐</div>
                    <div className="lp-quote-icon">“</div>
                </div>
                <p className="lp-testimonial-content">{c.description}</p>
                <div className="lp-client-profile">
                    <div className="lp-avatar-wrapper">
                        {/* <img src={`http://localhost:5000/uploads/${c.image}`} alt={c.name} /> */}
                        <img src={`${API_BASE_URL}/uploads/${c.image}`} alt={c.name} /> 
                    </div>
                    <div className="lp-client-info">
                        <h4>{c.name}</h4>
                        <span className="lp-designation-chip">{c.designation}</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
</section>

{/* ENHANCED SUBSCRIBE SECTION */}
<section className="lp-subscribe-wrapper">
    <div className="lp-subscribe-card animate-slide-up">
        <div className="lp-sub-content">
            <div className="lp-sub-icon">📩</div>
            <h2>Subscribe for Exclusive Listings</h2>
            <p>Get first-row access to luxury properties before they hit the open market.</p>
        </div>
        <form onSubmit={handleSubscribe} className="lp-premium-sub-form">
            <div className="lp-input-group">
                <input 
                    type="email" 
                    placeholder="yourname@email.com" 
                    value={subEmail} 
                    onChange={e => setSubEmail(e.target.value)} 
                    required 
                />
                <button type="submit">Get VIP Access</button>
            </div>
            <span className="lp-privacy-note">🔒 We respect your privacy. Unsubscribe at any time.</span>
        </form>
    </div>
</section>

            {/* CONTACT & NEWSLETTER SPLIT */}
<section id="contact" className="lp-contact-section">
    <div className="lp-contact-container animate-fade">
        <div className="lp-contact-grid">
            
            {/* LEFT: CONTACT INFO PANE */}
            <div className="lp-info-pane">
                <span className="lp-mini-tag">Contact Us</span>
                <h2>Get a Free <span>Consultation</span></h2>
                <p>Ready to find your dream property? Fill out the form and our luxury property experts will reach out within 24 hours.</p>
                
                <div className="lp-contact-methods">
                    <div className="lp-method-item">
                        <div className="lp-method-icon">📍</div>
                        <div>
                            <h4>Visit Our Office</h4>
                            <p>123 Luxury Lane, Real Estate Plaza, NY</p>
                        </div>
                    </div>
                    <div className="lp-method-item">
                        <div className="lp-method-icon">📞</div>
                        <div>
                            <h4>Call Priority Line</h4>
                            <p>+1 (555) 000-REALTY</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT: INTERACTIVE CONTACT FORM */}
            <div className="lp-form-pane">
                <form onSubmit={handleContact} className="lp-modern-form">
                    <div className="lp-form-input-box">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            placeholder="e.g. John Doe" 
                            value={contact.fullName} 
                            onChange={e => setContact({...contact, fullName: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className="lp-form-input-box">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="johndoe@email.com" 
                            value={contact.email} 
                            onChange={e => setContact({...contact, email: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className="lp-form-row-compact">
                        <div className="lp-form-input-box">
                            <label>Mobile Number</label>
                            <input 
                                type="text" 
                                placeholder="+1 234..." 
                                value={contact.mobile} 
                                onChange={e => setContact({...contact, mobile: e.target.value})} 
                                required 
                            />
                        </div>
                        <div className="lp-form-input-box">
                            <label>City</label>
                            <input 
                                type="text" 
                                placeholder="e.g. New York" 
                                value={contact.city} 
                                onChange={e => setContact({...contact, city: e.target.value})} 
                                required 
                            />
                        </div>
                    </div>

                    <button type="submit" className="lp-form-submit-btn">
                        Submit  <span>→</span>
                    </button>
                </form>
            </div>

        </div>
    </div>
</section>
        </div>
    );
}