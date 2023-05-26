import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./slices/userDataSlice";

export default configureStore({
  reducer: {
    userData: userDataReducer,
  },
});
