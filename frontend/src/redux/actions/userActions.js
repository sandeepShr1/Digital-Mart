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
// Update password
export const updatePassword = (passwords) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.UPDATE_PASSWORD_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await axios.put(`/api/v1/password/update`, passwords, config);

            dispatch({ type: actionTypes.UPDATE_PASSWORD_SUCCESS, payload: data.success });
      } catch (error) {
            dispatch({
                  type: actionTypes.UPDATE_PASSWORD_FAIL,
                  payload: error.response.data.message,
            });
      }
};

// forgot password
export const forgotPassword = (email) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.FORGOT_PASSWORD_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await axios.post(`/api/v1/password/forgot`, email, config);

            dispatch({ type: actionTypes.FORGOT_PASSWORD_SUCCESS, payload: data.message });
      } catch (error) {
            dispatch({
                  type: actionTypes.FORGOT_PASSWORD_FAIL,
                  payload: error.response.data.message,
            });
      }
};

// Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.RESET_PASSWORD_REQUEST });
            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config);

            dispatch({ type: actionTypes.RESET_PASSWORD_SUCCESS, payload: data.success });
      } catch (error) {
            dispatch({
                  type: actionTypes.RESET_PASSWORD_FAIL,
                  payload: error.response.data.message,
            });
      }
};

// admin get all users
export const getAllUsers = () => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.GET_USERS_REQUEST });

            const { data } = await axios.get('/api/v1/admin/users');

            dispatch({
                  type: actionTypes.GET_USERS_SUCCESS,
                  payload: data.users
            })

      } catch (error) {
            dispatch({
                  type: actionTypes.GET_USERS_FAIL,
                  payload: error.response.data.message,
            });
      }
}

//Get user
export const getUser = (id) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.GET_USER_REQUEST });

            const { data } = await axios.get(`/api/v1/admin/users/${id}`);

            dispatch({
                  type: actionTypes.GET_USER_SUCCESS,
                  payload: data.user
            })

      } catch (error) {
            dispatch({
                  type: actionTypes.GET_USER_FAIL,
                  payload: error.response.data.message,
            });
      }
}


// update user admin
export const updateUser = (id, userData) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.EDIT_USER_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } }

            const { data } = await axios.put(
                  `/api/v1/admin/users/update/${id}`,
                  userData,
                  config
            )

            dispatch({ type: actionTypes.EDIT_USER_SUCCESS, payload: data.success })
      } catch (error) {
            dispatch({
                  type: actionTypes.EDIT_USER_FAIL,
                  payload: error.response.data.message,
            });
      }
}

// delete user
export const deleteUser = (id) => async (dispatch) => {
      try {
            dispatch({ type: actionTypes.DELETE_USER_REQUEST });

            const { data } = await axios.delete(`/api/v1/admin/users/delete/${id}`, id);

            dispatch({
                  type: actionTypes.DELETE_USER_SUCCESS,
                  payload: data.success
            })

      } catch (error) {
            dispatch({
                  type: actionTypes.DELETE_USER_FAIL,
                  payload: error.response.data.message,
            });
      }
}

// clearing errors
export const clearError = () => async (dispatch) => {
      dispatch({
            type: actionTypes.CLEAR_ERRORS
      })
}