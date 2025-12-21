// This automatically chooses the right URL:
// If you are on your computer, it uses localhost.
// If you are on Vercel, it uses your Render link.

const API_URL = process.env.NODE_ENV === 'production' 
    ? "https://realty-management-system0101.onrender.com" 
    : "http://localhost:5000";

export default API_URL;