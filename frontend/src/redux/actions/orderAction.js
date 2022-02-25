import * as actionTypes from "../constants/orderConstants"
import axios from "axios";

// Create Order
export const createOrder = (order) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.CREATE_ORDER_REQUEST });

            const config = {
                  headers: {
                        "Content-Type": "application/json",
                  },
            };
            const { data } = await axios.post("/api/v1/order/new", order, config);

            dispatch({ type: actionTypes.CREATE_ORDER_SUCCESS, payload: data });
      } catch (error) {
            dispatch({
                  type: actionTypes.CREATE_ORDER_FAIL,
                  payload: error.response.data.message,
            });
      }
};

// get all my orders
export const getMyOrders = () => async (dispatch) => {
      try {
            dispatch({
                  type: actionTypes.MY_ORDERS_REQUEST
            })

            const { data } = await axios.get("/api/v1/orders/me");

            dispatch({
                  type: actionTypes.MY_ORDERS_SUCCESS,
                  payload: data.orders
            })

      } catch (error) {
            dispatch({
                  type: actionTypes.CREATE_ORDER_FAIL,
                  payload: error.response.data.message,
            });
      }
}

// Clearing Errors
export const clearError = () => async (dispatch) => {
      dispatch({ type: actionTypes.CLEAR_ERRORS });
};