// import dependencies, routes, middleware, DB
require('dotenv').config();
console.log('JWT_SECRET VALUE:', process.env.JWT_SECRET);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const userRoutes = require('./routes/userRoutes');
const PORT = process.env.PORT || 3000;

//middleware
const app = express();
app.use((req, res, next) => {
  console.log('HIT:', req.method, req.url);
  next();
});

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use('/api/auth', authRoutes);
app.use('/api/note', noteRoutes);
app.use('/api/user', userRoutes);

//mongoose connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


//start app
//app.listen(PORT, () => {
    //console.log(`Server is running on port ${PORT}`);
//});