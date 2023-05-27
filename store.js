import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./slices/userDataSlice";
import productsReducer from "./slices/productsSlice";
export default configureStore({
  reducer: {
    userData: userDataReducer,
    products: productsReducer,
  },
});
