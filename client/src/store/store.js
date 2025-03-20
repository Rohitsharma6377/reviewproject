import { configureStore } from "@reduxjs/toolkit";

export default configureStore(
   {
    reducer:{
        Rating:{ratingReducer}
    }
   }
);
