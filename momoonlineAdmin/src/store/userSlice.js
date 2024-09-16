import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "globals/misc/Statuses";
import { APIAuthenticated } from "http";

const userSlice = createSlice({
  name: "users",
  initialState: {
    status: STATUSES.LOADING,
    users: null,
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    deleteUserItem(state, action) {
      const index = state.users.findIndex(
        (user) => user._id === action.payload.userId
      );
      state.users.splice(index, 1);
    },
  },
});

export const { setStatus, setUsers, deleteUserItem } = userSlice.actions;

export default userSlice.reducer;

// slice for User Fetching
export function fetchUser() {
  return async function fetchUserThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get("/admin/users/");
      console.log(response.data);
      dispatch(setUsers(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// slice for User Deletion
export function deleteUser(userId) {
  return async function deleteUserThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.delete(`/admin/users/${userId}`);
      console.log(response.data);
      dispatch(deleteUserItem({ userId }));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
