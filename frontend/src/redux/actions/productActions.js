import axios from "axios";

import * as actionTypes from "../constants/productConstants";

export const getProduct = (keyword = "", currentPage = 1) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.ALL_PRODUCT_REQUEST });

            let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;
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

// clearing errors
export const clearError = () => async (dispatch) => {
      dispatch({
            type: actionTypes.CLEAR_ERRORS
      })
}