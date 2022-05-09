import { configureStore } from "@reduxjs/toolkit";
import { watchDisplayedReducer } from "./watchDisplayedSlice";
import { shoppingBagReducers } from "./shoppingBag";
export const store = configureStore({
  reducer: {
    watchDisplayed: watchDisplayedReducer,
    shoppingBag: shoppingBagReducers,
  },
});
