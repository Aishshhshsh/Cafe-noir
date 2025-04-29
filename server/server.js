const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");




const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cafe_noir', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

app.get('/api/products', (req, res) => {
    res.json([]); // some list of products
  });
  

// Test Route
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is working!" });
});

const orderRoutes = require('./routes/orderRoutes');
app.use('/api', orderRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Backend Server: http://localhost:${PORT}`);
    console.log(`📡 Test API: http://localhost:${PORT}/api/products`);
});
