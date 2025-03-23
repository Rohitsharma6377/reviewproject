import { createSlice } from "@reduxjs/toolkit";

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    ratings: [], // Stores all individual ratings
    averageRating: 0, // Stores the average rating
    ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, // Count of each star rating
  },
  reducers: {
    addRating: (state, action) => {
      const newRating = action.payload;

      // Add the new rating to the array
      state.ratings.push(newRating);

      // Update the count of the specific star rating
      if (newRating in state.ratingCounts) {
        state.ratingCounts[newRating]++;
      }

      // Recalculate the average rating
      const total = state.ratings.reduce((sum, rating) => sum + rating, 0);
      state.averageRating = total / state.ratings.length;
    },
  },
});

export const { addRating } = ratingSlice.actions;
export default ratingSlice.reducer;
