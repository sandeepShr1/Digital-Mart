import React from 'react';
import './App.css';
import Header from "./components/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from 'webfontloader';
import Footer from './components/layout/Footer/Footer';
import Home from "./components/Home/Home.js"
import Products from "./components/Products/Products.js"

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])
  return <Router>
    <Header />
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/products" element={<Products />} />
    </Routes>
    <Footer />
  </Router>
}

export default App;
