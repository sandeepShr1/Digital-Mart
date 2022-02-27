import axios from "axios";

import * as actionTypes from "../constants/productConstants";

export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.ALL_PRODUCT_REQUEST });

            let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

            if (category) {
                  link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
            }
            const { data } = await axios.get(link);

            dispatch({
                  type: actionTypes.ALL_PRODUCT_SUCCESS,
                  payload: data
            })

      } catch (error) {
            dispatch({
                  type: actionTypes.ALL_PRODUCT_FAIL,
                  payload: error.response.data.message
            })
      }
}

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.PRODUCT_DETAILS_REQUEST });

            const { data } = await axios.get(`/api/v1/product/${id}`);

            dispatch({
                  type: actionTypes.PRODUCT_DETAILS_SUCCESS,
                  payload: data.product,
            });
      } catch (error) {
            dispatch({
                  type: actionTypes.PRODUCT_DETAILS_FAIL,
                  payload: error.response.data.message,
            });
      }
};
// Get Products Details
export const newReview = (reviewData) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.NEW_REVIEWS_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } }
            const { data } = await axios.put("/api/v1/review", reviewData, config);

            dispatch({
                  type: actionTypes.NEW_REVIEWS_SUCCESS,
                  payload: data.success,
            });
      } catch (error) {
            dispatch({
                  type: actionTypes.NEW_REVIEWS_FAIL,
                  payload: error.response.data.message,
            });
      }
};



// clearing errors
export const clearError = () => async (dispatch) => {
      dispatch({
            type: actionTypes.CLEAR_ERRORS
      })
}