import { configureStore } from "@reduxjs/toolkit";
import { watchDisplayedReducer } from "./watchDisplayedSlice";
export const store = configureStore({
  reducer: {
    watchDisplayed: watchDisplayedReducer,
  },
});
