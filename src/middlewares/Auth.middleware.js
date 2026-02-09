const jwt = require('jsonwebtoken');
const { resp } = require('../func');

// -------------------------------------------------------------------------- //

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return resp(res, 401, 'Missing or invalid Authorization header');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.token = payload;
  } catch (err) {
    return resp(res, 401, 'Invalid or expired token');
  }

  next();
};
