import axios from "axios";

import * as actionTypes from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.LOGIN_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } }

            const { data } = await axios.post(
                  '/api/v1/login',
                  { email, password },
                  config
            )

            dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data.user })

      } catch (error) {
            dispatch({
                  type: actionTypes.LOGIN_FAIL,
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