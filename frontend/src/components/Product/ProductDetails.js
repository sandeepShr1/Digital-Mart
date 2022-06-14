import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { clearError, getProductDetails, newReview } from "../../redux/actions/productActions";
import "./ProductDetails.css";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import ReviewCard from "../Product/ReviewCard";
import { useAlert } from "react-alert";
import { addToCart } from "../../redux/actions/cartActions";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material"
import { Rating } from '@mui/material';
import { NEW_REVIEWS_RESET } from "../../redux/constants/productConstants"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ProductCart from '../Home/ProductCart';

const ProductDetails = () => {
      const [index, setIndex] = useState(0);

      const [quantity, setQuantity] = useState(1);
      const [open, setOpen] = useState(false);
      const [rating, setRating] = useState(0);
      const [comment, setComment] = useState("");

      const alert = useAlert();
      const { id } = useParams();
      const { product, loading, error, similarProducts } = useSelector(state => state.productDetails);
      const { success, error: reviewError } = useSelector(
            (state) => state.newReview
      );

      const dispatch = useDispatch();
      const options = {
            size: "large",
            value: product.ratings,
            readOnly: true,
            precision: 0.5,
      }


      const decreaseQuantity = () => {
            if (quantity <= 1) return;
            let qty = quantity - 1
            setQuantity(qty)
      }
      const increaseQuantity = () => {
            if (quantity >= product.stock) return;
            let qty = quantity + 1
            setQuantity(qty)

      }

      const addToCartHandler = () => {
            dispatch(addToCart(id, quantity));
            alert.success("Item Added To Cart.")
      }

      const submitReviewToggle = () => {
            open ? setOpen(false) : setOpen(true)
      }

      const submitReviewHandler = () => {
            const myForm = new FormData();

            myForm.set("rating", rating);
            myForm.set("comment", comment);
            myForm.set("productId", id);

            dispatch(newReview(myForm));
            setOpen(false)
      }

      useEffect(() => {
            if (error) {
                  alert.error(error);
                  dispatch(clearError());
            }
            if (reviewError) {
                  alert.error(reviewError);
                  dispatch(clearError());
            }

            if (success) {
                  alert.success("Review Submitted Successfully");
                  dispatch({ type: NEW_REVIEWS_RESET });
            }
            dispatch(getProductDetails(id));

      }, [dispatch, id, alert, error, reviewError, success]);
      return (
            <>
                  {loading ? (
                        <Loader />
                  ) : (
                        <>
                              <MetaData title={`${product.name} -- ECOMMERCE`} />

                              <div>
                                    <div className="product-detail-container">
                                          <div>
                                                <div className="image-container">
                                                      <img src={product.images && product.images[index].url} alt="images" className='product-detail-image' />
                                                </div>
                                                <div className="small-images-container">
                                                      {product.images && product.images?.map((item, i) => (
                                                            <img
                                                                  key={i}
                                                                  src={item.url}
                                                                  className={i === index ? "small-image selected-image" : "small-image"}
                                                                  onMouseEnter={() => setIndex(i)}
                                                                  alt={product.name}
                                                            />
                                                      ))}
                                                </div>
                                          </div>

                                          <div className='product-detail-desc'>
                                                <h1>{product.name}</h1>
                                                <div className="reviews">
                                                      <div>
                                                            <Rating {...options} />
                                                      </div>
                                                      <p>
                                                            ({product.numOfReviews})
                                                      </p>
                                                </div>
                                                <h4>Details:</h4>
                                                <p>{product.description}</p>
                                                <p className='price'>{`रू${product.price}`}</p>
                                                <p>
                                                      Status:{" "}
                                                      <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                                            {product.stock < 1 ? "Out of Stock" : "In Stock"}
                                                      </b>
                                                </p>
                                                <div className="quantity">
                                                      <h3>Quantity:</h3>
                                                      <p className="quantity-desc">
                                                            <span className='minus' onClick={decreaseQuantity}>
                                                                  -
                                                            </span>
                                                            <span className='num'>
                                                                  {quantity}
                                                            </span>
                                                            <span className='plus' onClick={increaseQuantity}>
                                                                  +
                                                            </span>
                                                      </p>
                                                </div>
                                                <div className="buttons">
                                                      <button
                                                            onClick={addToCartHandler}
                                                            disabled={product.stock < 1 ? true : false}
                                                            type='button'
                                                            className="add-to-cart"
                                                      >
                                                            Add to Cart
                                                      </button>
                                                      <button
                                                            onClick={submitReviewToggle}
                                                            className="buy-now"
                                                            type='button'
                                                      >
                                                            Submit Review
                                                      </button>
                                                </div>
                                          </div>
                                    </div>

                                    <h3 className="reviewsHeading">REVIEWS</h3>
                                    <Dialog
                                          aria-labelledby='simple-dialog-title'
                                          open={open}
                                          onClose={submitReviewToggle}
                                    >
                                          <DialogTitle>Submit Review</DialogTitle>
                                          <DialogContent className='submitDialog'>
                                                <Rating
                                                      onChange={(e) => setRating(e.target.value)}
                                                      value={Number(rating)}
                                                      size="large"
                                                />
                                                <textarea
                                                      className='submitDialogTextArea'
                                                      cols="30"
                                                      rows="5"
                                                      onChange={(e) => setComment(e.target.value)}
                                                >

                                                </textarea>
                                                <DialogActions>
                                                      <Button color='secondary' onClick={submitReviewToggle}>Cancel</Button>
                                                      <Button color="primary" onClick={submitReviewHandler}>Submit</Button>
                                                </DialogActions>
                                          </DialogContent>

                                    </Dialog>

                                    {product.reviews && product.reviews[0] ? (
                                          <div className="reviews">
                                                {product.reviews && product.reviews.map((review) => <ReviewCard key={review._id} review={review} />)}
                                          </div>
                                    ) : (
                                          <p className="noReviews">No reviews</p>
                                    )}
                                    {/* <h3 className="reviewsHeading">SIMILAR PRODUCTS</h3> */}

                                    {/* <div className="similarProducts">
                                    {
                                          similarProducts && similarProducts.map((prod, i) => (
                                                <ProductCart product={prod} key={prod._id} />
                                          ))
                                    }
                              </div> */}
                                    <div className="maylike-products-wrapper">
                                          <h1 className="reviewsHeading">SIMILAR PRODUCTS</h1>
                                          <div className="marquee">
                                                <div className="maylike-products-container track">
                                                      {similarProducts && similarProducts.map((product) => <ProductCart key={product._id} product={product} />)}
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </>)
                  }
            </>
      )
}

export default ProductDetails