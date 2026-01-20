// import dependencies, routes, middleware, DB
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const userRoutes = require('./routes/userRoutes');
const PORT = 3000;

//middleware
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use('/api/auth', authRoutes);
app.use('/api/note', noteRoutes);
app.use('/api/user', userRoutes);

//mongoose connect
mongoose.connect('mongodb://127.0.0.1:27017/notes-app')
.then(() => console.log('MongoDB connected.'))
.catch((err) => console.log('Error connecting DB.'));

//start app
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});