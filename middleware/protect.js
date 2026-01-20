// import dependencies
const jwt = require('jsonwebtoken');

//protect function
const protect = (req, res, next) => {
    //grabbing headers from front end
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized.' });
    }
    //splitting token from header
    const token = authHeader.split(' ')[1];
    //try to decode the token and attach to user
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err) {
        res.status(401).json({ message: 'Unauthorized.' });
    }
};

//export
module.exports = protect;

