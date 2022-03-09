import React, { useEffect, useState } from 'react';
import "./ProductReviews.css";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import { clearError, getAllReviews, deleteReview } from "../../redux/actions/productActions";
import { DELETE_REVIEWS_RESET } from "../../redux/constants/productConstants"
import { Delete, Star } from "@mui/icons-material"
import { Button } from '@mui/material';
import SideBar from "./Sidebar";

const Reviews = () => {
      const alert = useAlert();
      const dispatch = useDispatch();
      const history = useNavigate();
      const [productId, setProductId] = useState("");

      const { error, reviews, loading } = useSelector(state => state.reviews)
      const { error: deleteError, isDeleted } = useSelector(
            (state) => state.review
      );


      const deleteReviewHandler = (reviewId) => {
            dispatch(deleteReview(reviewId, productId));
      }

      const productReviewsSubmitHandler = (e) => {
            e.preventDefault();
            dispatch(getAllReviews(productId))
      }

      useEffect(() => {
            if (productId.length === 24) {
                  dispatch(getAllReviews(productId));
            }
            if (error) {
                  alert.error(error);
                  dispatch(clearError());
            }
            if (deleteError) {
                  alert.error(deleteError);
                  dispatch(clearError());
            }
            if (isDeleted) {
                  alert.success("Review Deleted Successfully");
                  history("/admin/reviews");
                  dispatch({ type: DELETE_REVIEWS_RESET });
            }

      }, [dispatch, alert, error, deleteError, history, productId, isDeleted]);

      const columns = [
            { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

            {
                  field: "user",
                  headerName: "User",
                  minWidth: 200,
                  flex: 0.6,
            },

            {
                  field: "comment",
                  headerName: "Comment",
                  minWidth: 350,
                  flex: 1,
            },

            {
                  field: "rating",
                  headerName: "Rating",
                  type: "number",
                  minWidth: 180,
                  flex: 0.4,

                  cellClassName: (params) => {
                        return params.getValue(params.id, "rating") >= 3
                              ? "greenColor"
                              : "redColor";
                  },
            },

            {
                  field: "actions",
                  flex: 0.3,
                  headerName: "Actions",
                  minWidth: 150,
                  type: "number",
                  sortable: false,
                  renderCell: (params) => {
                        return (
                              <>
                                    <Button
                                          onClick={() =>
                                                deleteReviewHandler(params.getValue(params.id, "id"))
                                          }
                                    >
                                          <Delete />
                                    </Button>
                              </>
                        );
                  },
            },
      ];

      const rows = [];

      reviews &&
            reviews.forEach((item) => {
                  rows.push({
                        id: item._id,
                        rating: item.rating,
                        comment: item.comment,
                        user: item.name,
                  });
            });

      return (
            <>
                  <MetaData title={`ALL REVIEWS - Admin`} />

                  <div className="dashboard">
                        <SideBar />
                        <div className="productReviewsContainer">
                              <form
                                    className="productReviewsForm"
                                    onSubmit={productReviewsSubmitHandler}
                              >
                                    <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

                                    <div>
                                          <Star />
                                          <input
                                                type="text"
                                                placeholder="Product Id"
                                                required
                                                value={productId}
                                                onChange={(e) => setProductId(e.target.value)}
                                          />
                                    </div>

                                    <Button
                                          id="createProductBtn"
                                          type="submit"
                                          disabled={
                                                loading ? true : false || productId === "" ? true : false
                                          }
                                    >
                                          Search
                                    </Button>
                              </form>

                              {reviews && reviews.length > 0 ? (
                                    <DataGrid
                                          rows={rows}
                                          columns={columns}
                                          pageSize={10}
                                          disableSelectionOnClick
                                          className="productListTable"
                                          autoHeight
                                    />
                              ) : (
                                    <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                              )}
                        </div>
                  </div>
            </>
      )
}


export default Reviews