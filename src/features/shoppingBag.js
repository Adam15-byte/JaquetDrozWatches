import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const shoppingBagSlice = createSlice({
  name: "shoppingBag",
  initialState,
  reducers: {
    ////
    // action.payload is and object with all item information
    ////
    addToBag: (state, action) => {
      console.log(action.payload);
      state = state.push(action.payload);
    },
    removeFromBag: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToBag, removeFromBag } = shoppingBagSlice.actions;
export const shoppingBagReducers = shoppingBagSlice.reducer;
