import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentWatch: 0,
};

export const watchOnScreenState = createSlice({
  name: "watch",
  initialState,
  reducers: {
    setNewWatch: (state, action) => {
      state.currentWatch = action.payload;
    },
  },
});

export const { setNewScreen } = watchOnScreenState.actions;

// Selectors (data to read)
export const currentScreen = (state) => state.watch;

export default watchOnScreenState.reducer;
