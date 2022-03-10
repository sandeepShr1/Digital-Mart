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
import { Carousel } from 'react-responsive-carousel';

const ProductDetails = () => {

      const [quantity, setQuantity] = useState(1);
      const [open, setOpen] = useState(false);
      const [rating, setRating] = useState(0);
      const [comment, setComment] = useState("");

      const alert = useAlert();
      const { id } = useParams();
      const { product, loading, error } = useSelector(state => state.productDetails);
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

                              <div className="ProductDetails">
                                    <div className='d1'>
                                          <Carousel
                                                
                                          >
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

                                    <div className='d2'>
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
                                                <h1>{`रू${product.price}`}</h1>
                                                <div className="detailsBlock-3-1">
                                                      <div className="detailsBlock-3-1-1">
                                                            <button onClick={decreaseQuantity}>-</button>
                                                            <input readOnly type="number" value={quantity} />
                                                            <button onClick={increaseQuantity}>+</button>
                                                      </div>
                                                      <button
                                                            onClick={addToCartHandler}
                                                            disabled={product.stock < 1 ? true : false}
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

                                          <button onClick={submitReviewToggle} className="submitReview">
                                                Submit Review
                                          </button>
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
                        </>)
                  }
            </>
      )
}

export default ProductDetails