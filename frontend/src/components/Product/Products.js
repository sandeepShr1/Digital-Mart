import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { clearError, getProduct } from "../../redux/actions/productActions";
import Loader from "../layout/Loader/Loader"
import { useAlert } from "react-alert";
import ProductCart from '../Home/ProductCart';
import './Products.css';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from '@mui/material/Typography';




const Products = () => {
      const alert = useAlert();
      const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products);
      const dispatch = useDispatch();

      const [currentPage, setCurrentPage] = useState(1);
      const [price, setPrice] = useState([0, 25000]);

      const { keyword } = useParams();

      const setCurrentPageNo = (e) => {
            setCurrentPage(e)
      }
      const priceHandler = (event, newPrice) => {
            setPrice(newPrice);
      };
      let count = filteredProductsCount;

      useEffect(() => {
            if (error) {
                  alert.error(error());
                  dispatch(clearError);
            }
            dispatch(getProduct(keyword, currentPage, price))
      }, [dispatch, error, alert, keyword, currentPage, price]);
      return (
            <>
                  {loading ? <Loader /> : (
                        <>
                              <h2 className="productsHeading">Latest Products</h2>

                              <div className="products">
                                    {products && products.map(product => {
                                          return <ProductCart product={product} key={product._id} />
                                    })}

                              </div>

                              <div className="filterBox">
                                    <Typography>Price</Typography>
                                    <Slider
                                          value={price}
                                          onChange={priceHandler}
                                          valueLabelDisplay="auto"
                                          aria-labelledby="range-slider"
                                          min={0}
                                          max={25000}
                                    />

                              </div>

                              {resultPerPage < count && (
                                    <div className="paginationBox">
                                          <Pagination
                                                activePage={currentPage}
                                                itemsCountPerPage={resultPerPage}
                                                totalItemsCount={productsCount}
                                                onChange={setCurrentPageNo}
                                                nextPageText="Next"
                                                prevPageText="Prev"
                                                firstPageText="1st"
                                                lastPageText="Last"
                                                itemClass="page-item"
                                                linkClass="page-link"
                                                activeClass="pageItemActive"
                                                activeLinkClass="pageLinkActive"
                                          />
                                    </div>
                              )}
                        </>
                  )}
            </>
      )
}
export default Products;
