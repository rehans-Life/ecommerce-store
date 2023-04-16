import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.wishlistItems = action.payload || [];
    },
    addToWishlist: (state, action) => {
      if (state.wishlistItems.map((item) => item._id) === action.payload._id) {
        return;
      }
      state.wishlistItems.push(action.payload);
      updateWishlist(state.wishlistItems);
    },
    removeFromWislist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (items) => items._id !== action.payload
      );
      updateWishlist(state.wishlistItems);
    },
  },
});

const updateWishlist = (wishlistItems) => {
  localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
};

export const { setWishlist, addToWishlist, removeFromWislist } =
  wishlistSlice.actions;

export const selectWishlistItems = (state) => {
  return state.wishlist.wishlistItems;
};

export default wishlistSlice.reducer;
