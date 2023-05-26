import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    value: {
      favorites: [],
      cart: [],
    },
  },
  reducers: {
    addFavorite: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.favorites.push(action.payload);
    },
    removeFavorite: (state) => {},
    addToCart: (state, action) => {
      state.cart.push(actions.payload);
    },
    removeFromCart: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { addFavorite, removeFavorite, addToCart, removeFromCart } =
  userDataSlice.actions;

export default userDataSlice.reducer;
