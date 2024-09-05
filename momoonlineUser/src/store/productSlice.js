import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/misc/Statuses";
import { API } from "../http";

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.LOADING,
    selectedProduct: {},
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setSelectedProduct(state, action) {
      state.selectedProduct = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchProducts.pending, (state, action) => {
  //       state.status = STATUSES.LOADING;
  //     })
  //     .addCase(fetchProducts.fulfilled, (state, action) => {
  //       state.status = STATUSES.SUCCESS;
  //       state.data = action.payload;
  //     })
  //     .addCase(fetchProducts.rejected, (state, action) => {
  //       state.status = STATUSES.ERROR;
  //     });
  // },
});

export const { setProducts, setStatus, setSelectedProduct } =
  productSlice.actions;

export default productSlice.reducer;

// export const fetchProducts = createAsyncThunk("products/fetch", async () => {
//   const response = await axios.get("http://localhost:3000/api/products");
//   const { data } = response.data;
//   return data;
// });

// Fetching all products
export function fetchProducts() {
  return async function fetchProductThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.get("/products");
      dispatch(setProducts(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// Fetching single product
export function fetchProductDetails(productId) {
  return async function fetchProductDetailsThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.get(`/products/${productId}`);
      dispatch(setSelectedProduct(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
