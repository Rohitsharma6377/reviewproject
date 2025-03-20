import { configureStore } from "@reduxjs/toolkit";
import ratingSlice from "./reducers/ratingSlice";

export default configureStore(
   {
    reducer:{
        rating:{ratingSlice}
    }
   }
);
