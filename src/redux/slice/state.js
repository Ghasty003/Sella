import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "state",
  initialState: {
    isBtnLoading: false,
    openDetails: false,
  },
  reducers: {
    toggleIsBtnLoading(state) {
      state.isBtnLoading = !state.isBtnLoading;
    },
    setOpenDetails(state, action) {
      state.openDetails = action.payload;
    },
  },
});

export const { toggleIsBtnLoading, setOpenDetails } = stateSlice.actions;

export default stateSlice.reducer;
