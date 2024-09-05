import { configureStore } from "@reduxjs/toolkit";
import checkoutSlice from "./checkoutSlice";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    product: productSlice,
    auth: authSlice,
    checkout: checkoutSlice,
  },
});

export default store;
