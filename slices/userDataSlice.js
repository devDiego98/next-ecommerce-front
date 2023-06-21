import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    favorites: [],
    cart: {
      items: [],
      total: 0,
    },
  },
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((fav) => fav !== action.payload);
    },
    addToCart: (state, action) => {
      let currentCart = [...state.cart.items];
      let index = currentCart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        state.cart.items[index].quantity += action.payload.quantity;
      } else {
        state.cart.items.push(action.payload);
      }
      state.cart.total += action.payload.quantity * action.payload.price;
    },
    updateQuantity: (state, action) => {
      let currentCart = [...state.cart.items];
      let index = currentCart.findIndex(
        (item) => item._id === action.payload._id
      );

      state.cart.items[index].quantity = action.payload.quantity;
      state.cart.total = calculateCartTotal(state.cart.items);
    },
    removeFromCart: (state, action) => {},
  },
});
function calculateCartTotal(products) {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    const quantity = products[i].quantity;
    const price = products[i].price;
    total += quantity * price;
  }
  return total;
}
// Action creators are generated for each case reducer function
export const {
  addFavorite,
  removeFavorite,
  addToCart,
  updateQuantity,
  removeFromCart,
  setFavorites,
} = userDataSlice.actions;

export default userDataSlice.reducer;
