import axios from "axios";

import * as actionTypes from "../constants/userConstants";

//Login
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

// Register
export const register = (userData) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.REGISTER_REQUEST });

            const config = { headers: { "Content-Type": "multipart/form-data" } };

            const { data } = await axios.post(`/api/v1/register`, userData, config);

            dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: data.user });
      } catch (error) {
            dispatch({
                  type: actionTypes.REGISTER_FAIL,
                  payload: error.response.data.message,
            });
      }
};


// Load User
export const loadUser = () => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.LOAD_USER_REQUEST });

            const { data } = await axios.get(`/api/v1/me`);

            dispatch({ type: actionTypes.LOAD_USER_SUCCESS, payload: data.user });
      } catch (error) {
            dispatch({ type: actionTypes.LOAD_USER_FAIL, payload: error.response.data.message });
      }
};

// Logout User
export const logout = () => async (dispatch) => {
      try {
            await axios.get(`/api/v1/logout`);

            dispatch({ type: actionTypes.LOGOUT_SUCCESS });
      } catch (error) {
            dispatch({ type: actionTypes.LOGOUT_FAIL, payload: error.response.data.message });
      }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.UPDATE_PROFILE_REQUEST });

            const config = { headers: { "Content-Type": "multipart/form-data" } };

            const { data } = await axios.put(`/api/v1/me/update`, userData, config);

            dispatch({ type: actionTypes.UPDATE_PROFILE_SUCCESS, payload: data.success });
      } catch (error) {
            dispatch({
                  type: actionTypes.UPDATE_PROFILE_FAIL,
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