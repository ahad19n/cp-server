const { resp } = require('../func');
const Shop = require('../models/Shop.model');

exports.getAllShops = async (req, res) => {
  const shops = await Shop.find();
  return resp(res, 200, 'Fetched all shops successfully', { shops });
};
