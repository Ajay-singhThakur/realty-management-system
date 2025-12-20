const mongoose = require('mongoose');

// Project Schema
const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
});

// Client Schema
const ClientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    designation: { type: String, required: true }, // e.g., CEO, Designer
    image: { type: String, required: true }
});

// Contact Lead Schema
const LeadSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    mobile: String,
    city: String,
    createdAt: { type: Date, default: Date.now }
});

// Newsletter Subscriber Schema
const subscriberSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }
}, { timestamps: true }); 

module.exports = {
    Project: mongoose.model('Project', ProjectSchema),
    Client: mongoose.model('Client', ClientSchema),
    Lead: mongoose.model('Lead', LeadSchema),
    Subscriber: mongoose.model('Subscriber', SubscriberSchema)
};