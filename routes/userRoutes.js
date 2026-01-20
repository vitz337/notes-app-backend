// import dependencies, middleware, router, controller
const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const { getUserProfile } = require('../controllers/userController');

//GET profile
router.get('/profile', protect, getUserProfile);

//export 
module.exports = router;
