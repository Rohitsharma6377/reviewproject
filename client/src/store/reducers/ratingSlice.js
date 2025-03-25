// import { createSlice } from "@reduxjs/toolkit";

// const ratingSlice = createSlice({
//   name: "rating",
//   initialState: {
//     ratings: [], 
//     averageRating: 0, 
//     ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, 
//   },
//   reducers: {
//     addRating: (state, action) => {
//       const newRating = action.payload;

//       // Add the new rating to the array
//       state.ratings.push(newRating);

//       // Update the count of the specific star rating
//       if (newRating in state.ratingCounts) {
//         state.ratingCounts[newRating]++;
//       }

//       // Recalculate the average rating
//       const total = state.ratings.reduce((sum, rating) => sum + rating, 0);
//       state.averageRating = total / state.ratings.length;
//     },
//   },
// });

// export const { addRating } = ratingSlice.actions;
// export default ratingSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Add Rating to Database
export const addRatingToDB = createAsyncThunk(
  "rating/addRatingToDB",
  async (rating, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/ratings/add", { rating });
      return response.data.newRating;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  Fetch Ratings from Database
export const fetchRatings = createAsyncThunk(
  "rating/fetchRatings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/ratings/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    ratings: [], 
    averageRating: 0, 
    ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRatingToDB.fulfilled, (state, action) => {
        state.ratings.push(action.payload.rating);
      })
      .addCase(fetchRatings.fulfilled, (state, action) => {
        state.ratings = action.payload.ratings;
        state.averageRating = action.payload.averageRating;
        state.ratingCounts = action.payload.ratingCounts;
      })
      .addCase(fetchRatings.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export default ratingSlice.reducer;
