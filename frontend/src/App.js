import React, { useEffect, Suspense } from 'react';
import Footer from './components/layout/Footer/Footer';

import Home from "./components/Home/Home"
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ProductDetails from "./components/Product/ProductDetails"
// import Products from "./components/Product/Products";
import LoginSignup from './components/User/LoginSignup';
import store from "./redux/store";
import { loadUser } from './redux/actions/userActions';
import { useSelector } from "react-redux";
import UserOptions from './components/layout/Header/UserOptions';
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile"
import UpdatePassword from "./components/User/UpdatePassword"
import ForgotPassword from "./components/User/ForgotPassword"
import ResetPassword from "./components/User/ResetPassword"
import Cart from "./components/Cart/Cart"
import Shipping from "./components/Cart/Shipping"
import ConfirmOrder from "./components/Cart/ConfirmOrder"
import Payment from "./components/Cart/Payment"
import Success from "./components/Cart/Success"
import MyOrders from "./components/Order/MyOrders"
import OrderDetails from "./components/Order/OrderDetails"
import Dashboard from "./components/Admin/Dashboard";
// import ProductList from "./components/Admin/ProductList";
import Login from "./components/User/LoginSignup";
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrderList from './components/Admin/OrderList';
import UpdateOrder from './components/Admin/UpdateOrder';
import Users from './components/Admin/Users.js';
import UpdateUser from './components/Admin/UpdateUser.js';
import Reviews from './components/Admin/Reviews.js';
import NotFound from "./components/layout/NotFound/NotFound.js"
import Navbar from './components/layout/Header/Navbar';
import About from "./components/layout/About/About.js"
import Failed from './components/Cart/Failed';
import ValidatePayment from './components/Cart/ValidatePayment';
import Banners from './components/Admin/Banner/Banners';
import NewBanner from './components/Admin/Banner/NewBanner';
import UpdateBanner from './components/Admin/Banner/UpdateBanner';
import Loader from './components/layout/Loader/Loader';
// const Home = React.lazy(() => import("./components/Home/Home"));
const Products = React.lazy(() => import("./components/Product/Products"));
const ProductDetails = React.lazy(() => import("./components/Product/ProductDetails"));
// const Dashboard = React.lazy(() => import("./components/Admin/Dashboard"));
const ProductList = React.lazy(() => import("./components/Admin/ProductList"));

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return <Router>
    <Navbar />
    <Suspense fallback={<Loader />}>
      {isAuthenticated && <UserOptions user={user} />}
      <div className="main-container">
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/about" element={<About />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/login" element={<LoginSignup />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/account" element={isAuthenticated ? <Profile /> : <Login />} />
          <Route path="/me/update" element={isAuthenticated ? <UpdateProfile /> : <Login />} />
          <Route path="/password/update" element={isAuthenticated ? <UpdatePassword /> : <Login />} />
          <Route path="/shipping" element={isAuthenticated ? <Shipping /> : <Login />} />
          <Route path="/order/confirm" element={isAuthenticated ? <ConfirmOrder /> : <Login />} />
          <Route path="/process/payment" element={isAuthenticated ? <Payment /> : <Login />} />
          <Route path="/epay/transrec" element={isAuthenticated ? <ValidatePayment /> : <Login />} />
          <Route path="/success" element={isAuthenticated ? <Success /> : <Login />} />
          <Route path="/failed" element={isAuthenticated ? <Failed /> : <Login />} />
          <Route path="/orders" element={isAuthenticated ? <MyOrders /> : <Login />} />
          <Route path="/order/:id" element={isAuthenticated ? <OrderDetails /> : <Login />} />

          {/* <Route element={<ProtectedRoute isAuthenticated={isAuthenticated } isAdmin={true} adminRoute={true} />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route> */}

          <Route path="/admin/dashboard" element={isAuthenticated && user.role === "admin" ? <Dashboard /> : <Login />} />
          <Route path="/admin/products" element={isAuthenticated && user.role === "admin" ? <ProductList /> : <Login />} />
          <Route path="/admin/product/" element={isAuthenticated && user.role === "admin" ? <NewProduct /> : <Login />} />
          <Route path="/admin/product/:id" element={isAuthenticated && user.role === "admin" ? <UpdateProduct /> : <Login />} />
          <Route path="/admin/orders" element={isAuthenticated && user.role === "admin" ? <OrderList /> : <Login />} />
          <Route path="/admin/order/:id" element={isAuthenticated && user.role === "admin" ? <UpdateOrder /> : <Login />} />
          <Route path="/admin/users" element={isAuthenticated && user.role === "admin" ? <Users /> : <Login />} />
          <Route path="/admin/user/:id" element={isAuthenticated && user.role === "admin" ? <UpdateUser /> : <Login />} />
          <Route path="/admin/reviews" element={isAuthenticated && user.role === "admin" ? <Reviews /> : <Login />} />

          <Route path="/admin/banners" element={isAuthenticated && user.role === "admin" ? <Banners /> : <Login />} />
          <Route path="/admin/banner/" element={isAuthenticated && user.role === "admin" ? <NewBanner /> : <Login />} />
          <Route path="/admin/banner/:id" element={isAuthenticated && user.role === "admin" ? <UpdateBanner /> : <Login />} />
        </Routes>
      </div>
      <Footer />
    </Suspense>
  </Router>

}

export default App;
