const express = require('express');
const router = express.Router();
const { Project, Client, Lead, Subscriber } = require('../models/DataModels');

// Get all projects for landing page [cite: 11]
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) { res.status(500).send(err); }
});

// Get all clients for landing page 
router.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) { res.status(500).send(err); }
});

// Submit Contact Form [cite: 61]
router.post('/contact', async (req, res) => {
    try {
        const newLead = new Lead(req.body);
        await newLead.save();
        res.status(201).json({ message: "Saved" });
    } catch (err) { res.status(500).send(err); }
});

// Newsletter Subscription [cite: 71]
router.post('/subscribe', async (req, res) => {
    try {
        const sub = new Subscriber({ email: req.body.email });
        await sub.save();
        res.status(201).json({ message: "Subscribed" });
    } catch (err) { res.status(400).send("Error"); }
});

module.exports = router;