import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./slices/userDataSlice";
import productsReducer from "./slices/productsSlice";
import categoriesReducer from "./slices/categoriesSlice";
export default configureStore({
  reducer: {
    userData: userDataReducer,
    products: productsReducer,
    categories: categoriesReducer,
  },
});
