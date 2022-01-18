const mongoose = require("mongoose")
const avatarSchema = new mongoose.Schema({
    // name: String,
    feature1: Number,
    feature2: Number,
    feature3: Number
  });

module.exports = mongoose.model('Avatar', avatarSchema);
