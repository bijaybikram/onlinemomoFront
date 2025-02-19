import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
// import router from './routes'
import Navbar from './globals/components/navbar/Navbar'
import { Provider } from 'react-redux'
import store from './store/store'
import Home from './pages/home/Home'
import Login from './pages/auth/login/Login'
import Cart from './pages/cart/Cart'
import Register from './pages/auth/register/Register'
import Product from './pages/home/components/Product'
import ProductDetails from './pages/productDetails/ProductDetails'
import Footer from './globals/components/footer/Footer'
import Checkout from './pages/checkout/Checkout'
import Khaltisuccess from './pages/payment/Khaltisuccess'
import UserProfile from './pages/profile/UserProfile'
import MyOrders from './pages/myOrders/MyOrders'
import OrderDetails from './pages/orderDetails/OrderDetails'
import ForgotPassword from './pages/auth/forgotPassword/ForgotPassword'
import VerifyOtp from './pages/auth/verifyOtp/VerifyOtp'
// import ProtectedRoute from './pages/ProtectedRoute'
// import AdminDashboard from './pages/admin/dashboard/AdminDashboard'


function App() {

  return (
    <>
      <Provider store={store}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgotpassword" element={<ForgotPassword/>} />
          <Route path="/verifyotp" element={<VerifyOtp/>} />
          <Route path="/products" element={<Product/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/productdetails/:id" element={<ProductDetails/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/khaltisuccess" element={<Khaltisuccess/>} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/myorders" element={<MyOrders/>} />
          <Route path="/myorders/:id" element={<OrderDetails/>} />
          {/* <Route path="/admin" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>} /> */}
        </Routes>
        <Footer/>
      </BrowserRouter>

      {/* <Navbar/>
<RouterProvider router={router} /> */}
      </Provider>
    </>


  )
}

export default App
