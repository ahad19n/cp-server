const mongoose = require("mongoose");
const Shop = require("../src/models/Shop.model");
require("dotenv").config({path: "../.env"});

const seedShops = async () => {
	await mongoose.connect(process.env.MONGODB_URI);
    await Shop.deleteMany({});
	await Shop.insertMany([
		{ id: 1, name: "Ground Floor - CS", address: "Ground Floor, CS Department, Academic Block 2, CUI Islamabad", capabilities: ["Black & White Printing", "A4 Size"] },
		{ id: 2, name: "First Floor - CS", address: "First Floor, CS Department, Academic Block 2, CUI Islamabad", capabilities: ["Black & White Printing", "Color Printing", "A4 Size"] },
		{ id: 3, name: "Ground Floor - EE", address: "Ground Floor, EE Department, Academic Block 1, CUI Islamabad", capabilities: ["Black & White Printing", "Color Printing", "A4 Size", "A3 Size"] },
	]);
	console.log("✅ Shops seeded!");
	process.exit(0);
};
seedShops();
