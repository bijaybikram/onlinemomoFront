import React from "react";
import { Routes, Route } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
// import AuthLayout from "layouts/auth";
import { Provider } from "react-redux";
import store from "store/store";
import AdminLogin from "views/auth/SignIn";
import ProtectedRoute from "ProtectedRoute";
const App = () => {
  return (
    <Provider store={store}>
      <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="admin/*" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>} />
      <Route path="rtl/*" element={<RtlLayout />} />
      {/* <Route path="/" element={<Navigate to="/admin" replace />} /> */}
    </Routes>
    </Provider>
  );
};

export default App;
