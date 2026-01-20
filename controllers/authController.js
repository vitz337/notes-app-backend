// import dependencies, User model
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//generate token function
const generateToken = (userID) => {
    return jwt.sign({ id: userID }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

//register
exports.registerUser = async (req, res) => {
    //grabbing email and password from front end
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ message: 'Fields cannot be empty.' });

    //try to see if user exist
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({ message: 'User already exist.' });

        //create user
        const user = await User.create({ email, password });
        //attach token
        const token = generateToken(user._id);
        res.status(200).json({ token });
    } catch(err) {
        res.status(401).json({ message: 'Unauthorized.' });
    }
};

//login
exports.loginUser = async (req, res) => {
    //grabbing email and password from front end
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ message: 'Fields cannot be empty.' });

    //try to find user
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({ message: 'User cannot be found.' });

        //match pw
        const isMatch = await user.matchPassword(password);
        if(!isMatch) return res.status(401).json({ message: 'Unauthorized.' });

        //attach token
        const token = generateToken(user._id);
        res.status(200).json({ token });
    } catch(err) {
        res.status(500).json({ message: 'Error logging in.' });
    }
};