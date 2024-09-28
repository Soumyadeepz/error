const express = require('express');
const mongoose = require('mongoose'); // First and only declaration
const cors = require('cors');

// Initialize Express
const app = express();
app.use(express.json()); // for parsing application/json
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('Error connecting to MongoDB', err));

// Define a Mongoose schema
const commoditySchema = new mongoose.Schema({
    date: String,
    catagoryName: String,
    commodityType: String,
    dailyPrice: Number,
    avgPrice: Number,
    state: String,
    market: String,
    bufferStock: Number,
    stockRelease: Number,
    supplyData: Number,
    demandData: Number,
    seasonalIndicator: String,
    productionEstimate: Number,
    importData: String,
    exportData: String,
    disasterScale: String
});

const Commodity = mongoose.model('Commodity', commoditySchema);

// API route for adding commodity data
app.post('/add-commodity', async (req, res) => {
    try {
        const newCommodity = new Commodity(req.body);
        await newCommodity.save();
        res.status(200).json({ message: 'Commodity Data Saved' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error Saving Data' });
    }
});

// API route for retrieving commodity data
app.get('/commodities', async (req, res) => {
    try {
        const commodities = await Commodity.find();
        res.json(commodities);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error Fetching Data' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
