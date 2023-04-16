import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basket: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    clearBasket: (state) => {
      state.basket = [];
      saveCart(JSON.stringify([]));
    },
    addToBasket: (state, action) => {
      const ids = state.basket.map((item) => item.id);
      if (ids.includes(action.payload.id)) {
        state.basket = state.basket.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.basket.push(action.payload);
      }
      saveCart(JSON.stringify(state.basket));
    },
    removeFromBasket: (state, action) => {
      const index = state.basket.findIndex(
        (item) => item.id === action.payload
      );
      const quantity = state.basket[index].quantity;
      if (quantity > 1) {
        state.basket = state.basket.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        state.basket = state.basket.filter(
          (item) => item.id !== action.payload
        );
      }
      saveCart(JSON.stringify(state.basket));
    },
  },
});

const saveCart = (basket) => {
  localStorage.setItem("basket", basket);
};

export const { addToBasket, removeFromBasket, clearBasket, setBasket } =
  cartSlice.actions;

export const selectBasket = (state) => {
  return state.cart.basket;
};

export const selectBasketTotal = (state) => {
  return state.cart.basket.reduce(
    (prev, item) => prev + item.price * item.quantity,
    0
  );
};

export default cartSlice.reducer;
