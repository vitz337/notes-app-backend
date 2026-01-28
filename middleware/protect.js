// import dependencies
const jwt = require('jsonwebtoken');

//protect function
const protect = (req, res, next) => {
  console.log('AUTH HEADER =>', req.headers.authorization);

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'NO/BAD AUTH HEADER' });
  }

  const token = authHeader.split(' ')[1];
  console.log('TOKEN START =>', token?.slice(0, 20));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('DECODED =>', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('JWT VERIFY ERROR >>>', err.message);
    return res.status(401).json({ error: 'JWT INVALID' });
  }
};

//export
module.exports = protect;

