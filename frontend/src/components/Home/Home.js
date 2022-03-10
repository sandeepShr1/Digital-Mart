import React, { useEffect } from 'react';
import MetaData from "../layout/MetaData";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux"
import ProductCart from './ProductCart';
import { clearError, getProduct } from "../../redux/actions/productActions";
import Loader from "../layout/Loader/Loader"
import { useAlert } from "react-alert";
import shoppingImg from "../../images/shopping1.png"

const Home = () => {
      const alert = useAlert();
      const { products, loading, error } = useSelector(state => state.products);
      const dispatch = useDispatch();

      useEffect(() => {
            if (error) {
                  alert.error(error);
                  dispatch(clearError())
            }
            dispatch(getProduct());

      }, [dispatch, alert, error]);
      return (
            <>
                  {loading ? (<Loader />) : <>
                        <MetaData title="ECOMMERCE" />
                        <div className="header">
                              <div className="container2">
                                    <div className="row">
                                          <div className="col-1">
                                                <h1>Welcome To DigitalMart</h1>
                                                <p>FIND AMAZING PRODUCTS BELOW</p>
                                                <br />
                                                <a href="#container" >
                                                      <button >
                                                            Scroll <CgMouse />
                                                      </button>
                                                </a>
                                          </div>
                                          <div className="col-2">
                                                <img src={shoppingImg} alt="" />
                                          </div>

                                    </div>
                              </div>
                        </div>

                        <h2 className="homeHeading">Features Products</h2>

                        <div className="container1" id='container'>
                              {products && products.map(product => {
                                    return <ProductCart product={product} key={product._id} />
                              })}

                        </div>
                  </>
                  }
            </>

      )
}
export default Home;
