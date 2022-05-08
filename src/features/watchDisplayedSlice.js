import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collectionNumber: 3,
  colorIndex: 0,
  isLoadingNewWatch: false,
  sizeSelected: 36,
};

export const watchDisplayedSlice = createSlice({
  name: "watchDisplayed",
  initialState,
  reducers: {
    setNewWatch: (state, action) => {
      state.collectionNumber = action.payload;
    },
    setNewColor: (state, action) => {
      state.colorIndex = action.payload;
      state.isLoadingNewWatch = false;
    },
    setNewSize: (state, action) => {
      state.sizeSelected = action.payload;
    },
    setIsLoadingNewWatch: (state, action) => {
      state.isLoadingNewWatch = action.payload;
    },
  },
});

export const watchDisplayedReducer = watchDisplayedSlice.reducer;

export const { setNewWatch, setNewColor, setNewSize, setIsLoadingNewWatch } =
  watchDisplayedSlice.actions;
