import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",

  initialState: {
    text: "Hello world!",
  },

  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const { setText } = homeSlice.actions;
export default homeSlice.reducer;
