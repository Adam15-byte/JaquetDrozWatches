import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const shoppingBagSlice = createSlice({
  name: "shoppingBag",
  initialState,
  reducers: {
    addToBag: (state, action) => {
      const { collection, watchname, price, image } = action.payload;
      console.log(state.length > 0 ? state[0] : null);
      state = state.push({
        id: state.length,
        collection: collection,
        watchname: watchname,
        price: price,
        image: image,
        quantity: 1,
      });
    },
    removeFromBag: (state, action) => {
      state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToBag, removeFromBag } = shoppingBagSlice.actions;
export const shoppingBagReducers = shoppingBagSlice.reducer;
