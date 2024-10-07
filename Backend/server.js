// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todos');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const _dirname = path.resolve();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/todos', todoRoutes);

app.use(express.static(path.join(_dirname , "/client/build")))
app.get('*' , (_,res)=>{
    res.sendFile(path.resolve(_dirname, "client" , "build" , "index.html"));
})

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
