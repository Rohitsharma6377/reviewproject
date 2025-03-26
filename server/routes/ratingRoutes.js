const express = require("express");
const Rating = require("../model/Rating.js");

const router = express.Router();



router.post("/add", async (req, res) => {
  try {
    const { rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const newRating = new Rating({ rating });
    await newRating.save();

    res.status(201).json({ message: "Rating saved successfully!", newRating });
  } catch (error) {
    res.status(500).json({ error: "Failed to save rating." });
  }
});

// Get all ratings & calculate average
router.get("/all", async (req, res) => {
  try {
    const ratings = await Rating.find();

    // Calculate average rating
    const totalRatings = ratings.length;
    const avgRating = totalRatings > 0 
      ? (ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings).toFixed(1)
      : 0;

    // Count each star rating
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratings.forEach((r) => ratingCounts[r.rating]++);

    res.json({ ratings, averageRating: avgRating, ratingCounts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ratings." });
  }
});

module.exports = router;
