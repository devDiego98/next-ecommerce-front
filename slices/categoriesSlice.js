import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    subCategories: [],
  },
  reducers: {
    setAllCategories: (state, action) => {
      state.categories = action.payload;
    },
    setAllSubCategories: (state, action) => {
      state.subCategories = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAllCategories, setAllSubCategories } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
