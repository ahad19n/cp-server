const mongoose = require("mongoose");   

module.exports = mongoose.model("Transaction", new mongoose.Schema({
	name: {
		type: String,
		required: true,
        trim: true
	},
    amount: {
        type: Number,
        required: true
    },
    // timestamp (Date and Time Both)
    timestamp: {
        type: Date,
        default: Date.now
    },
    printSize: {
      type: String,
      required: true,
      enum: ["A4", "A3", "Letter", "Legal", "4x6"],
    },
    pages: {
        type: Number,
        required: true
    },
}));