import axios from "axios";

import * as actionTypes from "../constants/productConstants";

export const getProduct = (keyword = "", currentPage = 1, price = [0, 1000000], category, ratings = 0) => async (dispatch) => {
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

// get products lists admin
export const getAdminProducts = () => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.ADMIN_PRODUCT_REQUEST })
            const { data } = await axios.get('/api/v1/admin/products');

            dispatch({ type: actionTypes.ADMIN_PRODUCT_SUCCESS, payload: data.products })
      } catch (error) {
            dispatch({ type: actionTypes.ADMIN_PRODUCT_FAIL, payload: error.response.data.message })
      }
}

// create a product admin

export const createProduct = (productData) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.NEW_PRODUCT_REQUEST });

            const config = { headers: { "Content-Type": "multipart/form-data" } };
            const { data } = await axios.post("/api/v1/admin/product/new", productData, config);


            dispatch({
                  type: actionTypes.NEW_PRODUCT_SUCCESS,
                  payload: data
            })

      } catch (error) {
            dispatch({
                  type: actionTypes.NEW_PRODUCT_FAIL,
                  payload: error.response.data.message
            })
      }
}
// Update a product admin

export const updateProduct = (id, productData) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.UPDATE_PRODUCT_REQUEST });

            const config = { headers: { "Content-Type": "multipart/form-data" } };
            const { data } = await axios.put(`/api/v1/admin/update/${id}`, productData, config);


            dispatch({
                  type: actionTypes.UPDATE_PRODUCT_SUCCESS,
                  payload: data.success
            });

      } catch (error) {
            dispatch({
                  type: actionTypes.UPDATE_PRODUCT_FAIL,
                  payload: error.response.data.message
            });
      }
}

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.PRODUCT_DETAILS_REQUEST });

            const { data } = await axios.get(`/api/v1/product/${id}`);
            dispatch({
                  type: actionTypes.PRODUCT_DETAILS_SUCCESS,
                  payload: data,
            });
      } catch (error) {
            dispatch({
                  type: actionTypes.PRODUCT_DETAILS_FAIL,
                  payload: error.response.data.message,
            });
      }
};
// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.DELETE_PRODUCT_REQUEST });

            const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

            dispatch({
                  type: actionTypes.DELETE_PRODUCT_SUCCESS,
                  payload: data.success,
            });
      } catch (error) {
            dispatch({
                  type: actionTypes.DELETE_PRODUCT_FAIL,
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
                  payload: error.response.data.message
            });
      }
};

// get reviews admin
export const getAllReviews = (id) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.GET_REVIEWS_REQUEST });

            const { data } = await axios.get(`/api/v1/reviews?id=${id}`)

            dispatch({
                  type: actionTypes.GET_REVIEWS_SUCCESS,
                  payload: data.reviews
            })

      } catch (error) {
            dispatch({
                  type: actionTypes.GET_REVIEWS_FAIL,
                  payload: error.response.data.message
            })
      }
}
// delete reviews admin
export const deleteReview = (reviewId, productId) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.DELETE_REVIEWS_REQUEST });

            const { data } = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`)

            dispatch({
                  type: actionTypes.DELETE_REVIEWS_SUCCESS,
                  payload: data.success
            })

      } catch (error) {
            dispatch({
                  type: actionTypes.DELETE_REVIEWS_FAIL,
                  payload: error.response.data.message
            })
      }
}

// clearing errors
export const clearError = () => async (dispatch) => {
      dispatch({
            type: actionTypes.CLEAR_ERRORS
      })
}