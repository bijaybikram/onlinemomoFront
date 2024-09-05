import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/misc/Statuses";
import { APIAuthenticated } from "../http";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: STATUSES.LOADING,
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    updateItems(state, action) {
      const index = state.items.findIndex(
        (item) => item.product._id === action.payload.productId
      );
      if (index !== -1) {
        state.items[index].quantity = action.payload.quantity;
      }
    },
    deleteItems(state, action) {
      const index = state.items.findIndex(
        (item) => item.product._id === action.payload.productId
      );
      state.items.splice(index, 1);
    },
    emptyCart(state, action) {
      state.items = [];
    },
  },
});

export const { setItems, setStatus, updateItems, deleteItems, emptyCart } =
  cartSlice.actions;

export default cartSlice.reducer;

// slice for adding product to cart
export function addToCart(productId) {
  return async function addToCartThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.post(`/cart/${productId}`);
      // console.log(response);
      dispatch(setItems(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// slice for fetching product from cart
export function fetchCart() {
  return async function fetchCartThunk(dispatch) {
    const token = localStorage.getItem("token");
    dispatch(setStatus(STATUSES.LOADING));
    try {
      if (token) {
        const response = await APIAuthenticated.get("/cart/");
        // console.log(response);
        dispatch(setItems(response.data.data));
        dispatch(setStatus(STATUSES.SUCCESS));
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// slice for updating cartItems on the cart
export function updateCartItem(productId, quantity) {
  return async function updateCartItemThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.patch(`/cart/${productId}`, {
        quantity,
      });

      // console.log(response);
      dispatch(updateItems({ productId, quantity }));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// slice for deleting cartItems on the cart
export function deleteCartItem(productId) {
  return async function deleteCartItemThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.delete(`/cart/${productId}`);
      // console.log(response);
      dispatch(deleteItems({ productId }));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
