import React, { useEffect } from 'react';
import Header from "./components/layout/Header/Header.js";
import Footer from './components/layout/Footer/Footer.js';
import Home from "./components/Home/Home.js"
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from "./components/Product/ProductDetails"
import Products from "./components/Product/Products"
import Search from "./components/Product/Search";
import WebFont from "webfontloader";
import LoginSignup from './components/User/LoginSignup.js';
import store from "./redux/store";
import { loadUser } from './redux/actions/userActions.js';
import { useSelector } from "react-redux";
import UserOptions from './components/layout/Header/UserOptions';
import Profile from "./components/User/Profile";
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from "./components/User/UpdateProfile"

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
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
      <Route path="/account" element={(<ProtectedRoute><Profile /></ProtectedRoute>)} />
      <Route path="/me/update" element={(<ProtectedRoute><UpdateProfile /></ProtectedRoute>)} />
    </Routes>
    <Footer />
  </Router>

}

export default App;
