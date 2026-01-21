const mongoose = require("mongoose");
module.exports = mongoose.model("User", new mongoose.Schema({

  name: { type: String },
  phoneNumber: { type: String, required: true, unique: true, index: true },

}, { versionKey: false, timestamps: false }));
