const mongoose = require('mongoose');
module.exports = mongoose.model('Job', new mongoose.Schema({

  

}, { versionKey: false, timestamps: false }));
