import { configureStore } from "@reduxjs/toolkit";
import ratingReducer from "./reducers/ratingSlice";

const store = configureStore({
  reducer: {
    rating: ratingReducer,
  },
});

export default store;