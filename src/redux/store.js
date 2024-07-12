import { configureStore } from "@reduxjs/toolkit";
import state from "./slice/state";

export default configureStore({
  reducer: {
    state,
  },
});
