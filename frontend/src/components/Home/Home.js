import React from 'react';
import { CgMouse } from "react-icons/all";
import './Home.css';
import Product from "./Product.js";

const product = {
      name: "blue t-shirt",
      images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
      price: "Rs. 400",
      _id: "sandeep"
}
const Home = () => {
      return (
            <>
                  <div className="banner">
                        <p>Welcome to Ecommerce</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>

                        <a href="#container">
                              <button>
                                    Scroll <CgMouse />
                              </button>
                        </a>
                  </div>

                  <h2 className="homeHeading">Features Products</h2>
                  <div className="container" id='container'>
                        <Product product={product} />
                        <Product product={product} />
                        <Product product={product} />
                        <Product product={product} />
                        <Product product={product} />
                        <Product product={product} />
                        <Product product={product} />
                        <Product product={product} />
                  </div>
            </>
      )
}

export default Home;