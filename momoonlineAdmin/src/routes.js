import React from "react";

// Admin Imports
import Dashboard from "views/admin/default";
import Orders from "views/admin/orders";
import Users from "views/admin/users";
import Products from "views/admin/products";
import Reviews from "views/admin/reviews";
import RTLDefault from "views/rtl/default";

// Auth Imports
import AdminLogin from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdBook,
} from "react-icons/md";
import OrderDetails from "views/admin/orders/singleOrder";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <Dashboard />,
  },
  {
    name: "Orders",
    layout: "/admin",
    path: "orders",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Orders />,
    secondary: true,
  },
  {
    name: "Orders",
    layout: "/admin",
    path: "orders/:id",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <OrderDetails />,
    secondary: true,
    showInNavbar: false,
  },
  {
    name: "Products",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "products",
    component: <Products />,
  },
  {
    name: "Users",
    layout: "/admin",
    path: "users",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Users />,
  },
  {
    name: "Reviews",
    layout: "/admin",
    path: "reviews",
    icon: <MdBook className="h-6 w-6" />,
    component: <Reviews />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <AdminLogin />,
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "rtl",
    icon: <MdHome className="h-6 w-6" />,
    component: <RTLDefault />,
  },
];
export default routes;
