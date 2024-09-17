import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "globals/misc/Statuses";
import { APIAuthenticated } from "http";
import { API } from "http";

const productSlice = createSlice({
  name: "product",
  initialState: {
    status: STATUSES.LOADING,
    products: null,
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    deleteProductItem(state, action) {
      const index = state.products.findIndex(
        (product) => product._id === action.payload.productId
      );
      state.products.splice(index, 1);
    },
  },
});

export const { setProducts, setStatus, deleteProductItem } =
  productSlice.actions;

export default productSlice.reducer;

// Fetching all products
export function fetchProduct() {
  return async function fetchProductThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.get("/products");
      //   console.log(response.data.data, "haha");
      dispatch(setProducts(response.data.data.reverse()));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// slice for Product Deletion
export function deleteProduct(productId) {
  return async function deleteProductThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.delete(`/products/${productId}`);
      console.log(response);
      dispatch(deleteProductItem({ productId }));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
