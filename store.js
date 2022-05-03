import { configureStore } from "@reduxjs/toolkit";
import watchOnScreenReducer from "./src/redux/watchOnScreen";

export const store = configureStore({
  reducer: {
    currentWatch: watchOnScreenReducer,
  },
});
