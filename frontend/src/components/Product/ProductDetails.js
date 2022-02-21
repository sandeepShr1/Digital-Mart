import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
import { clearError, getProductDetails } from "../../redux/actions/productActions";
import Rating from "react-rating-stars-component";
import "./ProductDetails.css";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import ReviewCard from "../Product/ReviewCard";
import { useAlert } from "react-alert";

const ProductDetails = () => {

      const [quantity, setQuantity] = useState(1);

      const alert = useAlert();
      const { id } = useParams();
      const { product, loading, error } = useSelector(state => state.productDetails);
      const dispatch = useDispatch();
      const options = {
            edit: false,
            color: "rgba(20,20,20,0.2)",
            activeColor: "tomato",
            size: window.innerWidth < 900 ? 20 : 25,
            value: product.ratings,
            isHalf: true
      }

      const decreaseQuantity = () => {
            let qty = quantity - 1
            setQuantity(qty)
      }
      const increaseQuantity = () => {
            let qty = quantity + 1
            setQuantity(qty)
      }

      useEffect(() => {
            if (error) {
                  alert.error(error);
                  dispatch(clearError());
            }
            dispatch(getProductDetails(id));

      }, [dispatch, id, alert, error]);
      return (
            <>
                  {loading ? (
                        <Loader />
                  ) : (
                        <>
                              <MetaData title={`${product.name} -- ECOMMERCE`} />
                              <div className="ProductDetails">
                                    <div>
                                          <Carousel>
                                                {product.images &&
                                                      product.images.map((item, i) => (
                                                            <img
                                                                  className="CarouselImage"
                                                                  key={i}
                                                                  src={item.url}
                                                                  alt={`${i} Slide`}
                                                            />
                                                      ))}
                                          </Carousel>
                                    </div>


                                    <div>
                                          <div className="detailsBlock-1">
                                                <h2>{product.name}</h2>
                                                <p>Product # {product._id}</p>
                                          </div>
                                          <div className="detailsBlock-2">
                                                <Rating {...options} />
                                                <span className="detailsBlock-2-span">
                                                      {" "}
                                                      ({product.numOfReviews} Reviews)
                                                </span>
                                          </div>
                                          <div className="detailsBlock-3">
                                                <h1>{`Rs.${product.price}`}</h1>
                                                <div className="detailsBlock-3-1">
                                                      <div className="detailsBlock-3-1-1">
                                                            <button onClick={decreaseQuantity}>-</button>
                                                            <input readOnly type="number" value={quantity} />
                                                            <button onClick={increaseQuantity}>+</button>
                                                      </div>
                                                      <button
                                                      >
                                                            Add to Cart
                                                      </button>
                                                </div>

                                                <p>
                                                      Status:{" "}
                                                      <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                                            {product.stock < 1 ? "Out of Stock" : "In Stock"}
                                                      </b>
                                                </p>
                                          </div>

                                          <div className="detailsBlock-4">
                                                Description : <p>{product.description}</p>
                                          </div>

                                          <button className="submitReview">
                                                Submit Review
                                          </button>
                                    </div>
                              </div>

                              <h3 className="reviewsHeading">REVIEWS</h3>

                              {product.reviews && product.reviews[0] ? (
                                    <div className="reviews">
                                          {product.reviews && product.reviews.map((review) => <ReviewCard key={review._id} review={review} />)}
                                    </div>
                              ) : (
                                    <p className="noReviews">No reviews</p>
                              )}
                        </>)}
            </>
      )
}

export default ProductDetails