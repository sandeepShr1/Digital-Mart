import React, { useEffect } from 'react';
import MetaData from "../layout/MetaData";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux"
import ProductCart from './ProductCart';
import { clearError, getProduct } from "../../redux/actions/productActions";
import Loader from "../layout/Loader/Loader"
import { useAlert } from "react-alert";
import HeaderBanner from './HeaderBanner';
import FooterBanner from './FooterBanner';

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
                        <HeaderBanner />

                        <h2 className="homeHeading">Features Products</h2>

                        <div className='products-container'>
                              {products && products.map(product => {
                                    return <ProductCart product={product} key={product._id} />
                              })}

                        </div>

                        <FooterBanner />

                  </>
                  }
            </>

      )
}
export default Home;
