import React, { useEffect } from 'react';
import { CgMouse } from "react-icons/all";
import './Home.css';
import Product from "./Product.js";
import MetaData from "../layout/MetaData";
import { getProduct } from '../../redux/actions/productAction';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../layout/Loader/Loader';
import { useAlert } from "react-alert";

const Home = () => {
      const alert = useAlert();
      const { loading, products, error, productsCount } = useSelector(state => state.products)
      const dispatch = useDispatch();
      useEffect(() => {
            if (error) {
                  return alert.error(error);
            }
            dispatch(getProduct());

      }, [dispatch, error]);
      return (

            <>
                  {loading ? (< Loader />) : (<>
                        <MetaData title="ECOMMERCE" />
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
                              {products && products.map(product => {
                                    return <Product product={product} key={product._id} />
                              })}

                        </div>
                  </>)}

            </>

      )
}

export default Home;