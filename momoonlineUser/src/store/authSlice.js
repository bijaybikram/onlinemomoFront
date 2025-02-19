import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/misc/Statuses";
import { API, APIAuthenticated } from "../http";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    status: STATUSES.LOADING,
    token: "",
    fpData: {
      fpEmail: "",
      fpStatus: STATUSES.LOADING,
    },
  },
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    logOut(state, action) {
      state.data = [];
      state.token = null;
      state.status = STATUSES.SUCCESS;
    },
    setFpEmail(state, action) {
      state.fpData.fpEmail = action.payload;
    },
    setFpStatus(state, action) {
      state.fpData.fpStatus = action.payload;
    },
  },
});

export const { setUser, setStatus, setToken, logOut, setFpEmail, setFpStatus } =
  authSlice.actions;

export default authSlice.reducer;

// slice for user registration
export function registerUser(data) {
  return async function registerUserThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.post("/auth/register", data);
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// slice for user login
export function loginUser(data) {
  return async function loginUserThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.post("/auth/login", data);
      // console.log(response.data.data, "Hello");
      dispatch(setUser(response.data.data));
      dispatch(setToken(response.data.token));
      dispatch(setStatus(STATUSES.SUCCESS));
      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/";
      }
    } catch (error) {
      alert("Something went wrong!");
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// slice for fetching Profile
export function fetchProfile() {
  return async function fetchProfileThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get("/profile/");
      // console.log(response.data.data, "Hello");
      dispatch(setUser(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      alert("Something went wrong!");
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// slice for forgot password
export function forgotPassword(data) {
  return async function forgotPasswordThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.post(
        "/auth/forgotPassword",
        data
      );
      console.log(response.data.data, "Hello");
      dispatch(setFpEmail(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      alert("Something went wrong!");
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// slice for verify otp
export function verifyOtp(data) {
  return async function verifyOtpThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.post("/auth/verifyOtp", data);

      dispatch(setFpEmail(data.email));
      dispatch(setFpStatus(STATUSES.SUCCESS));
    } catch (error) {
      alert("Something went wrong!");
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
