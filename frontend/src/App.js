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

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return <Router>
    <Header />
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/product/:id" element={<ProductDetails />} />
      <Route exact path="/products" element={<Products />} />
      <Route path="/products/:keyword" element={<Products />} />
      <Route exact path="/search" element={<Search />} />
      <Route exact path="/login" element={<LoginSignup />} />
    </Routes>
    <Footer />
  </Router>

}

export default App;
