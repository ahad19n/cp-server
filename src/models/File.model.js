const mongoose = require('mongoose');
module.exports = mongoose.model('File', new mongoose.Schema({

  status: { type: String, required: true },
  mimeType: { type: String, required: true },
  uploadedBy: { type: String, required: true },
  sizeInBytes: { type: Number, required: true },
  originalName: { type: String, required: true },

  hash: { type: String, required: true, unique: true, index: true },

}, { versionKey: false }));
