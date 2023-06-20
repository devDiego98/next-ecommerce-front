import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    favorites: [],
    cart: [],
  },
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
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
export const {
  addFavorite,
  removeFavorite,
  addToCart,
  removeFromCart,
  setFavorites,
} = userDataSlice.actions;

export default userDataSlice.reducer;
