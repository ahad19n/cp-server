const jwt = require('jsonwebtoken');
const { resp } = require('../func');

module.exports = ({ type = 'any' } = {}) => {
  if (!['any', 'key'].includes(type)) {
    throw new Error(`Invalid auth type: ${type}`);
  }

  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return resp(res, 401, 'Missing Authorization Header');

    const [scheme, credentials] = header.split(' ');
    if (!scheme || !credentials) return resp(res, 401, 'Malformed Authorization Header');

    if (scheme.toLowerCase() === 'apikey') {
      if (credentials !== process.env.API_KEY) {
        return resp(res, 401, 'Invalid API Key');
      }

      return next();  // success
    }

    if (scheme.toLowerCase() === 'bearer') {
      if (type === 'key') return resp(res, 401, 'API Key Authentication Required');

      try {
        const payload = jwt.verify(credentials, process.env.JWT_SECRET);
        req.token = payload;
        return next();  // success
      }
      catch (err) {
        return resp(res, 401, 'Invalid or Expired JWT');
      }
    }

    return resp(res, 401, 'Unsupported Authorization Scheme');
  };
};
