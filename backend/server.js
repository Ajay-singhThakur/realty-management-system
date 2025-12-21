const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp'); // Required for Bonus Image Cropping
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure Uploads Directory Exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🚀 MERN Enterprise Database Connected"))
    .catch(err => console.error("Database Connection Error:", err));

// --- DATA MODELS ---

// Project: Image, Name, Description
const Project = mongoose.model('Project', {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
});

// Client: Image, Name, Description, Designation (Ex: CEO)
const Client = mongoose.model('Client', {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
});

// Contact Lead: Full Name, Email, Mobile, City
const Lead = mongoose.model('Lead', {
    fullName: String,
    email: String,
    mobile: String,
    city: String,
    createdAt: { type: Date, default: Date.now }
});

// Newsletter Subscriber: Email
const Subscriber = mongoose.model('Subscriber', {
    email: { type: String, unique: true, required: true }
});

// --- MULTER CONFIG (Memory Storage for Sharp processing) ---
const upload = multer({ storage: multer.memoryStorage() });

// --- REUSABLE IMAGE PROCESSOR (BONUS FEATURE) ---
// Resizes and crops image to specific 450x350 ratio before saving
const processAndSaveImage = async (buffer, prefix) => {
    const filename = `${prefix}-${Date.now()}.jpg`;
    await sharp(buffer)
        .resize(450, 350, {
            fit: 'cover',
            position: 'center'
        })
        .toFormat('jpeg')
        .toFile(path.join(uploadDir, filename));
    return filename;
};

// --- API ROUTES ---

// 1. PROJECT MANAGEMENT
app.get('/api/projects', async (req, res) => {
    const projects = await Project.find().sort({ _id: -1 });
    res.json(projects);
});

app.post('/api/projects', upload.single('image'), async (req, res) => {
    try {
        const image = await processAndSaveImage(req.file.buffer, 'proj');
        const newProject = new Project({ ...req.body, image });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: "Failed to upload project" });
    }
});

// 2. CLIENT MANAGEMENT
app.get('/api/clients', async (req, res) => {
    const clients = await Client.find().sort({ _id: -1 });
    res.json(clients);
});

app.post('/api/clients', upload.single('image'), async (req, res) => {
    try {
        const image = await processAndSaveImage(req.file.buffer, 'client');
        const newClient = new Client({ ...req.body, image });
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ error: "Failed to add client" });
    }
});

// 3. ADMIN OVERVIEW (Leads & Subscribers)
app.get('/api/admin/data', async (req, res) => {
  try {
    const projects = await Project.find();
    const leads = await Lead.find();
    const clients = await Client.find();
    // If you have subscribers, fetch them too:
    const subs = await Subscriber.find(); 

    res.json({
      projects: projects,
      leads: leads,
      clients: clients,
      subs: subs
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// 4. DELETE FUNCTIONALITY
app.delete('/api/:type/:id', async (req, res) => {
    const { type, id } = req.params;
    try {
        if (type === 'projects') await Project.findByIdAndDelete(id);
        if (type === 'clients') await Client.findByIdAndDelete(id);
        res.json({ success: true, message: `${type} item deleted` });
    } catch (error) {
        res.status(500).send("Delete failed");
    }
});

// 5. PUBLIC SUBMISSIONS (Contact & Subscribe)
app.post('/api/contact', async (req, res) => {
    const lead = new Lead(req.body);
    await lead.save();
    res.json({ success: true });
});

app.post('/api/subscribe', async (req, res) => {
    try {
        const sub = new Subscriber(req.body);
        await sub.save();
        res.json({ success: true });
    } catch (e) {
        res.status(400).send("Already Subscribed");
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is live at http://localhost:${PORT}`);
});