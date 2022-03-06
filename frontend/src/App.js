import React, { useEffect } from 'react';
import Header from "./components/layout/Header/Header";
import Footer from './components/layout/Footer/Footer';
import Home from "./components/Home/Home"
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from "./components/Product/ProductDetails"
import Products from "./components/Product/Products"
import Search from "./components/Product/Search";
import WebFont from "webfontloader";
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
import ProductList from "./components/Admin/ProductList";
import Login from "./components/User/LoginSignup";
import NewProduct from './components/Admin/NewProduct';


function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return <Router>
    <Header />
    {isAuthenticated && <UserOptions user={user} />}
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/product/:id" element={<ProductDetails />} />
      <Route exact path="/products" element={<Products />} />
      <Route path="/products/:keyword" element={<Products />} />
      <Route exact path="/search" element={<Search />} />
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
      <Route path="/success" element={isAuthenticated ? <Success /> : <Login />} />
      <Route path="/orders" element={isAuthenticated ? <MyOrders /> : <Login />} />
      <Route path="/order/:id" element={isAuthenticated ? <OrderDetails /> : <Login />} />

      <Route path="/admin/dashboard" element={isAuthenticated && user.role === "admin" ? <Dashboard /> : <Login />} />
      <Route path="/admin/products" element={isAuthenticated && user.role === "admin" ? <ProductList /> : <Login />} />
      <Route path="/admin/product/" element={isAuthenticated && user.role === "admin" ? <NewProduct /> : <Login />} />
    </Routes>
    <Footer />
  </Router>

}

export default App;
