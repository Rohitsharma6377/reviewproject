import { createSlice } from "@reduxjs/toolkit";

const ratingSlice = createSlice({
    name:"ratingReducer",
    initialState:{
        rating:[]
    },
    reducers : {
        addrating: (state , action)=>{
            state.rating.push(action.payload)
        }
    }
})

// export const {addrating} = ratingSlice.payload;
export  default ratingSlice;