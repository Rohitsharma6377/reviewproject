const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
}, { timestamps: true });

module.exports = mongoose.model("Rating", ratingSchema);
