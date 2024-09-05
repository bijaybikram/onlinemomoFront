import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/misc/Statuses";
import { APIAuthenticated } from "../http";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    data: [],
    status: STATUSES.LOADING,
    orders: null,
  },
  reducers: {
    setOrder(state, action) {
      state.data.push(action.payload);
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
  },
});

export const { setOrder, setStatus, setOrders } = checkoutSlice.actions;

export default checkoutSlice.reducer;

// slice for Order creation
export function createOrder(data) {
  return async function createOrderThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.post("/orders/", data);
      //   console.log(response.data);
      dispatch(setOrder(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// slice for Order Fetching
export function fetchOrder() {
  return async function fetchOrderThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get("/orders/");
      //   console.log(response.data);
      dispatch(setOrders(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// // slice for Order cancelling
// export function cancelOrder() {
//   return async function cancelOrderThunk(dispatch) {
//     dispatch(setStatus(STATUSES.LOADING));
//     try {
//       const response = await APIAuthenticated.patch("/orders/cancel");
//       //   console.log(response.data);
//       dispatch(setOrders(response.data.data));
//       dispatch(setStatus(STATUSES.SUCCESS));
//     } catch (error) {
//       console.log(error);
//       dispatch(setStatus(STATUSES.ERROR));
//     }
//   };
// }
