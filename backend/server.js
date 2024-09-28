// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express
const app = express();
app.use(express.json()); // for parsing application/json
app.use(cors());

// Connect to MongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('Error connecting to MongoDB', err));


// Define a Mongoose schema
const commoditySchema = new mongoose.Schema({
    date: String,
    catagoryName: String, // Fixed spelling
    commodityType: String,
    dailyPrice: Number,
    avgPrice: Number,
    state: String, // Fixed casing for consistency
    market: String, // Fixed casing for consistency
    bufferStock: Number,
    stockRelease: Number,
    supplyData: Number,
    demandData: Number,
    seasonalIndicator: String,
    // sowingArea: Number, // Uncomment if needed
    productionEstimate: Number,
    importData: String,
    exportData: String,
    disasterScale: String // Fixed casing for consistency
});

const Commodity = mongoose.model('Commodity', commoditySchema);

// API route for adding commodity data
app.post('/add-commodity', async (req, res) => {
    try {
        const newCommodity = new Commodity(req.body);
        await newCommodity.save();
        res.status(200).json({ message: 'Commodity Data Saved' }); // Changed to JSON response
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(400).json({ message: 'Error Saving Data' }); // Changed to JSON response
    }
});

// API route for retrieving commodity data
app.get('/commodities', async (req, res) => {
    try {
        const commodities = await Commodity.find();
        res.json(commodities);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(400).json({ message: 'Error Fetching Data' }); // Changed to JSON response
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
