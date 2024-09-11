import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "globals/misc/Statuses";
import { APIAuthenticated } from "http";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    status: STATUSES.LOADING,
    orders: null,
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
  },
});

export const { setStatus, setOrders } = orderSlice.actions;

export default orderSlice.reducer;

// slice for Order Fetching
export function fetchOrder() {
  return async function fetchOrderThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get("/admin/orders/");
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
