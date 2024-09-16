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
    updateOrder(state, action) {
      const index = state.orders.findIndex(
        (order) => order._id === action.payload.orderId
      );
      if (index !== -1) {
        state.orders[index] = action.payload.data;
      }
    },
    updatePaymentStatusById(state, action) {
      const index = state.orders.findIndex(
        (order) => order._id === action.payload.orderId
      );
      if (index !== -1) {
        state.orders[index] = action.payload.data;
      }
    },
    deleteOrderById(state, action) {
      const index = state.orders.findIndex(
        (order) => order._id === action.payload.orderId
      );
      state.orders.splice(index, 1);
    },
  },
});

export const {
  setStatus,
  setOrders,
  updateOrder,
  updatePaymentStatusById,
  deleteOrderById,
} = orderSlice.actions;

export default orderSlice.reducer;

// slice for Order Fetching
export function fetchOrder() {
  return async function fetchOrderThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get("/admin/orders/");
      dispatch(setOrders(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// slice for Order Deletion
export function deleteOrder(orderId) {
  return async function deleteOrderThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.delete(
        `/admin/orders/${orderId}`
      );
      console.log(response);
      dispatch(deleteOrderById({ orderId }));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// slice for Order Status updation
export function updateOrderStatus(orderId, orderStatus) {
  return async function updateOrderStatusThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));

    try {
      const response = await APIAuthenticated.patch(
        `/admin/orders/${orderId}`,
        { orderStatus }
      );
      dispatch(updateOrder({ orderId, data: response.data.data }));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// slice for Order Payment Status updation
export function updatePaymentStatus(orderId, paymentStatus) {
  return async function updateOrderPaymentStatusThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));

    try {
      const response = await APIAuthenticated.patch(
        `/admin/orders/paymentstatus/${orderId}`,
        { paymentStatus }
      );
      dispatch(updatePaymentStatusById({ orderId, data: response.data.data }));
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
