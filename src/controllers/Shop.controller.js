const { resp } = require('../func');
const Shop = require("../models/Shop.model");

// -------------------------------------------------------------------------- //

exports.getAllShops = async (req, res) => {
  const shops = await Shop.find();
  resp(res, 200, "Successfully fetched all shops", shops);
}
