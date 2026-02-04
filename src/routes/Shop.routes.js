const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop.model");

router.get("/", async (req, res) => {
    try {
		const shops = await Shop.find();
		res.status(200).json({
			success: true,
			message: "Shops retrieved successfully",
			shops: shops,
			count: shops.length,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error retrieving shops",
			error: error.message,
		});
	}
}); 

module.exports = router;    