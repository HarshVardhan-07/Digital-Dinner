import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get the token from headers

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    // Verify the token and attach user to request object
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure this matches jwt secret token
    req.user = decoded; // Attach decoded JWT payload to req.user
    next(); // Proceed to the next middleware
  } catch (err) {
    console.error('Error in auth middleware:', err);

    // Handle specific JWT errors
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token is invalid' });
    }

    // General error handling
    res.status(401).json({ error: 'Token is not valid' });
  }
};

export default auth;
