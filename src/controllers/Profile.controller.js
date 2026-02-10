const { resp } = require('../func');
const User = require('../models/User.model');

exports.fetchUserProfile = async (req, res) => {
  const user = await User.findOne({ number: req.token.number });
  return resp(res, 200, 'Fetched user profile successfully', { profile: user });
};

exports.updateUserProfile = async (req, res) => {
  const { name } = req.body || {};
  if (!name) return resp(res, 400, 'Missing or empty fields (name)');

  const user = await User.findOne({ number: req.token.number });
  user.name = name;
  await user.save();

  return resp(res, 200, 'Updated user profile successfully', { profile: user });
};
