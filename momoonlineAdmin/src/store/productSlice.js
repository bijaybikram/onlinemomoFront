import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "globals/misc/Statuses";
import { APIAuthenticated } from "http";
import { API } from "http";

const productSlice = createSlice({
  name: "product",
  initialState: {
    status: STATUSES.LOADING,
    products: [],
    selectedProduct: {},
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    updateProductStatusById(state, action) {
      const index = state.products.findIndex(
        (product) => product._id === action.payload.productId
      );
      if (index !== -1) {
        state.products[index] = action.payload.data;
      }
    },
    updateProductStockAndPriceById(state, action) {
      const index = state.products.findIndex(
        (product) => product._id === action.payload.productId
      );
      if (index !== -1) {
        state.products[index] = action.payload.data;
      }
    },
    deleteProductItem(state, action) {
      const index = state.products.findIndex(
        (product) => product._id === action.payload.productId
      );
      state.products.splice(index, 1);
    },
    addNewProductItem(state, action) {
      state.products.push(action.payload);
    },
  },
});

export const {
  setProducts,
  setStatus,
  deleteProductItem,
  updateProductStatusById,
  updateProductStockAndPriceById,
  addNewProductItem,
} = productSlice.actions;

export default productSlice.reducer;

// add new product
export function addNewProduct(data) {
  return async function addNewProductThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.post("/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      //   console.log(response.data.data, "haha");
      dispatch(addNewProductItem(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
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

// slice for product Status updation
export function updateProductStatus(productId, productStatus) {
  return async function updateProductStatusThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));

    try {
      const response = await APIAuthenticated.patch(
        `/products/productstatus/${productId}`,
        {
          productStatus,
        }
      );
      console.log(response, "haha");
      dispatch(
        updateProductStatusById({ productId, data: response.data.data })
      );
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// slice for product stock and price updation
export function updateProductStockAndPrice(productId, data) {
  return async function updateProductStockAndPriceThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));

    try {
      const response = await APIAuthenticated.patch(
        `/products/stockprice/${productId}`,
        data
      );
      console.log(response, "haha");
      dispatch(
        updateProductStockAndPriceById({ productId, data: response.data.data })
      );
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
