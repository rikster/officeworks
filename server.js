const express = require('express');
const app = express();

// Connect Database
const connectDB = require('./config/db');
connectDB();

// Init Middleware
// So we can accept body data
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/items', require('./routes/items'));
app.use('/api/deliveries', require('./routes/deliveries'));

const PORT = process.env.PORT || 5090;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));