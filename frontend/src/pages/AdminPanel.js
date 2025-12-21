import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

/*
export default function AdminPanel() {
  const [view, setView] = useState("dashboard");
  // Safety: Initialize with empty arrays to prevent .length crashes
  */
 export default function AdminPanel() {
    const API_BASE_URL = window.location.hostname === "localhost" 
        ? "http://localhost:5000" 
        : "https://realty-management-system0101.onrender.com";
        const [view, setView] = useState("dashboard");


  const [data, setData] = useState({
    projects: [],
    clients: [],
    leads: [],
    subs: [],
  });
  const [form, setForm] = useState({
    name: "",
    description: "",
    designation: "",
    image: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const res = await axios.get("http://localhost:5000/api/admin/data");
      const res = await axios.get(`${API_BASE_URL}/api/admin/data`);
      // Ensure fallback to empty arrays if backend returns null
      setData(res.data || { projects: [], clients: [], leads: [], subs: [] });
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

 const handleUpload = async (e, type) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach(key => {
        if (form[key]) fd.append(key, form[key]);
    });

    try {
        // await axios.post(`http://localhost:5000/api/${type}`, fd);
        await axios.post(`${API_BASE_URL}/api/${type}`, fd);

        alert("Published Successfully!");
        
        // --- THE FIX: Refresh data immediately ---
        await fetchData(); 
        setView("dashboard");
        // Clear the form for the next entry
        setForm({ name: '', description: '', designation: '', image: null });
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";
        
    } catch (err) {
        console.error("Upload failed", err);
    }
};

  return (
    <div className="admin-root">
      <aside className="side-nav">
        <div className="side-logo">
          REALTY<span>OS</span>
        </div>
        <nav>
          <button
            className={view === "dashboard" ? "active" : ""}
            onClick={() => setView("dashboard")}
          >
            📊 Dashboard
          </button>
          <button
            className={view === "add-project" ? "active" : ""}
            onClick={() => setView("add-project")}
          >
            🏗️ Projects
          </button>
          <button
            className={view === "add-client" ? "active" : ""}
            onClick={() => setView("add-client")}
          >
            👥 Clients
          </button>
          <button
            className={view === "leads" ? "active" : ""}
            onClick={() => setView("leads")}
          >
            📩 Leads
          </button>
        </nav>
        <Link to="/" className="nav-home">
          🏠 Back to Home
        </Link>
      </aside>

      <main className="main-view">
        {/* --- DASHBOARD SECTION --- */}
        {view === "dashboard" && (
          <div className="dashboard-wrapper animate-fade">
            <div className="welcome-banner-sleek">
              <div className="welcome-text">
                <h1>System Overview</h1>
                <p>Real-time data synchronization active</p>
              </div>
              <button className="sync-btn-sleek" onClick={fetchData}>
                🔄 
              </button>
            </div>

            <div className="modern-stat-grid-sleek">
              {/* PROJECTS TILE */}
              <div
                className="glass-tile-sleek blue-glow"
                onClick={() => setView("add-project")}
              >
                <div className="tile-header-sleek">
                  <div className="tile-icon-box-sleek">🏗️</div>
                  <span className="trend-tag-sleek">
                    +{data.projects?.length || 0}
                  </span>
                </div>
                <div className="tile-content-sleek">
                  <h3>{data.projects?.length || 0}</h3>
                  <p>Active Projects</p>
                </div>
                <div className="tile-footer-sleek">Manage Portfolio →</div>
              </div>

              {/* LEADS TILE */}
              <div
                className="glass-tile-sleek orange-glow"
                onClick={() => setView("leads")}
              >
                <div className="tile-header-sleek">
                  <div className="tile-icon-box-sleek">📨</div>
                  <span className="trend-tag-sleek">New</span>
                </div>
                <div className="tile-content-sleek">
                  <h3>{data.leads?.length || 0}</h3>
                  <p>Business Leads</p>
                </div>
                <div className="tile-footer-sleek">View Responses →</div>
              </div>

              {/* SUBSCRIBERS TILE */}
             <div 
          className="glass-tile-sleek green-glow" 
          onClick={() => setView("subscribers")} 
          style={{ cursor: 'pointer' }}
      >
          <div className="tile-header-sleek">
              <div className="tile-icon-box-sleek">🔔</div>
              <span className="trend-tag-sleek">Live</span>
          </div>
          <div className="tile-content-sleek">
              <h3>{data.subs?.length || 0}</h3>
              <p>Subscribers</p>
          </div>
          <div className="tile-footer-sleek">View List →</div>
      </div>

    </div>

            {/* QUICK ACTIONS SECTION */}
            <div className="quick-actions-card-sleek">
              <div className="action-info-sleek">
                <h4>Automated Image Cropping</h4>
                <p>Uploads processed to 450x350 for optimization.</p>
              </div>
              <div className="action-btns-sleek">
                <button
                  className="action-btn-p"
                  onClick={() => setView("add-project")}
                >
                  + Project
                </button>
                <button
                  className="action-btn-s"
                  onClick={() => setView("add-client")}
                >
                  + Client
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUBSCRIBER VIEW */}
{view === "subscribers" && (
  <div className="admin-view-container animate-fade">
    <div className="view-header-sleek">
      <div>
        <h2>Audience Intelligence</h2>
        <p>You have {data.subs?.length || 0} premium subscribers synced.</p>
      </div>
      
    </div>

    <div className="table-card-sleek">
      <table className="modern-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Email Identity</th>
            <th>Subscription Date</th>
            <th>Status</th>
            <th>Quick Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.subs?.length > 0 ? (
            data.subs.map((s, index) => (
              <tr key={s._id}>
                <td>{index + 1}</td>
                <td className="email-primary">{s.email}</td>
                {/* FIX: Using a fallback if date is missing */}
                <td>{s.createdAt ? new Date(s.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Pending Sync'}</td>
                <td><span className="badge-glow-green">Verified</span></td>
                <td>
                  <button className="mini-action-btn" onClick={() => navigator.clipboard.writeText(s.email)}>
                    Copy Email
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="empty-table">No subscribers in the database yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}
        {/* --- EDITOR SECTION --- */}


        {view === "add-project" && (
          <div className="project-editor-container animate-fade">
            {/* LEFT SIDE: FORM INPUTS */}
            <div className="editor-card-pro">
              <div className="editor-header">
                <span className="editor-icon">🏗️</span>
                <div>
                  <h3>Project Details</h3>
                  <p>Enter property specifications for the live site.</p>
                </div>
              </div>

              <form
                className="pro-editor-form"
                onSubmit={(e) => handleUpload(e, "projects")}
              >
                <div className="pro-field">
                  <label>Project Name</label>
                  <input
                    type="text"
                    value={form.name}
                    placeholder="e.g. Skyline Luxury Apartments"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="pro-field">
                  <label>Detailed Description</label>
                  <textarea
                    value={form.description}
                    placeholder="Describe the amenities, location, and unique features..."
                    rows="6"
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="pro-field">
                  <label>Project Cover Image</label>
                  <div className="custom-file-upload">
                    <input
                      type="file"
                      id="proj-img"
                      onChange={(e) =>
                        setForm({ ...form, image: e.target.files[0] })
                      }
                      required
                    />
                    <label htmlFor="proj-img" className="upload-box">
                      {form.image
                        ? `✔️ ${form.image.name}`
                        : "📂 Click to upload (Auto-crop 450x350)"}
                    </label>
                  </div>
                </div>

                <button type="submit" className="pro-publish-btn">
                  🚀 Publish Project
                </button>
              </form>
            </div>

            {/* RIGHT SIDE: LIVE PROPERTY PREVIEW */}

            <div className="preview-pane-pro">
              <div className="browser-header-sim">
                <div className="window-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="browser-url">
                  realtyos.com/projects/
                  {form.name.toLowerCase().replace(/\s+/g, "-")}
                </div>
              </div>

              <div className="project-preview-frame animate-up">
                <div className="property-visual-hub">
                  {form.image ? (
                    <img
                      src={URL.createObjectURL(form.image)}
                      alt="Preview"
                      className="main-property-img"
                    />
                  ) : (
                    <div className="visual-placeholder">
                      <span className="placeholder-dimension"></span>
                    </div>
                  )}
                  <div className="visual-overlay">
                    <span className="overlay-badge">PREMIUM</span>
                  </div>
                </div>

                <div className="property-details-hub">
                  <div className="property-meta-row">
                    <span className="p-category-tag"> PROJECT Name </span>
                    <span className="p-location-tag">📍 Indore ,India</span>
                  </div>

                  <h4
                    className={`p-title-display ${
                      form.name ? "val-active" : "val-dim"
                    }`}
                  >
                    {form.name || "Stunning Loft Apartment"}
                  </h4>

                  <p
                    className={`p-desc-display ${
                      form.description ? "val-active" : "val-dim"
                    }`}
                  >
                    {form.description ||
                      "The description of your masterpiece will be showcased here. Make it captivating to draw interest..."}
                  </p>

                  <div className="property-action-row">
                    <button className="p-explore-btn">EXPLORE & LEARN</button>
                    <div className="p-social-dummy">🔗 ♡ 📤</div>
                  </div>
                </div>
              </div>
              <p className="preview-hint">
                ✨ Changes are rendered in real-time as you type.
              </p>
            </div>
          </div>
        )}

        {view === "add-client" && (
          <div className="project-editor-container animate-fade">
            {/* LEFT SIDE: CLIENT FORM */}
            <div className="editor-card-pro">
              <div className="editor-header">
                <span className="editor-icon">🤝</span>
                <div>
                  <h3>Client Testimonial</h3>
                  <p>Add client feedback and professional credentials.</p>
                </div>
              </div>

              <form
                className="pro-editor-form"
                onSubmit={(e) => handleUpload(e, "clients")}
              >
                <div className="pro-field">
                  <label>Client Name</label>
                  <input
                    type="text"
                    value={form.name}
                    placeholder="e.g. Jessica Thompson"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="pro-field">
                  <label>Designation / Role</label>
                  <input
                    type="text"
                    value={form.designation}
                    placeholder="e.g. CEO, Global Logistics"
                    onChange={(e) =>
                      setForm({ ...form, designation: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="pro-field">
                  <label>Testimonial Message</label>
                  <textarea
                    value={form.description}
                    placeholder="Enter the client's feedback here..."
                    rows="5"
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="pro-field">
                  <label>Client Profile Photo</label>
                  <div className="custom-file-upload">
                    <input
                      type="file"
                      id="client-img"
                      onChange={(e) =>
                        setForm({ ...form, image: e.target.files[0] })
                      }
                      required
                    />
                    <label htmlFor="client-img" className="upload-box">
                      {form.image
                        ? `✔️ ${form.image.name}`
                        : "👤 Upload Avatar (Auto-crop 450x350)"}
                    </label>
                  </div>
                </div>

                <button type="submit" className="pro-publish-btn">
                  🤝 Save Testimonial
                </button>
              </form>
            </div>

            {/* RIGHT SIDE: PREMIUM TESTIMONIAL PREVIEW */}
            <div className="preview-pane-pro">
              <span className="preview-label">TESTIMONIAL PREVIEW</span>
              <div className="client-listing-card-premium">
                <div className="quote-icon-bg">“</div>

                <div className="card-content-pro">
                  <p
                    className={`testimonial-text ${
                      form.description ? "active-val" : "placeholder-val"
                    }`}
                  >
                    {form.description ||
                      "The client's testimonial text will appear here. This section is designed to build trust with your future customers..."}
                  </p>

                  <div className="client-profile-box">
                    <div className="client-avatar-frame">
                      {form.image ? (
                        <img
                          src={URL.createObjectURL(form.image)}
                          alt="Client"
                        />
                      ) : (
                        <div className="avatar-placeholder-icon">👤</div>
                      )}
                    </div>
                    <div className="client-info">
                      <h4
                        className={form.name ? "active-val" : "placeholder-val"}
                      >
                        {form.name || "Client Name"}
                      </h4>
                      <span
                        className={`designation-tag ${
                          form.designation ? "active-tag" : "placeholder-tag"
                        }`}
                      >
                        {form.designation || "CEO / Property Owner"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* --- LEADS SECTION --- */}
        {view === "leads" && (
          <div className="table-container animate-fade">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>👤 Name</th>
                  <th>📧 Email</th>
                  <th>📱 Mobile</th>
                  <th>📍 City</th>
                </tr>
              </thead>
              <tbody>
                {data.leads?.length > 0 ? (
                  data.leads.map((l) => (
                    <tr key={l._id}>
                      <td>{l.fullName}</td>
                      <td>{l.email}</td>
                      <td>{l.mobile}</td>
                      <td>{l.city}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      style={{ textAlign: "center", padding: "40px" }}
                    >
                      No leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
    
  );
}
