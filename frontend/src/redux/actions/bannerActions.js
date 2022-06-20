import axios from "axios";

import * as actionType from "../constants/bannerConstants";

export const createBanner = (bannerData) => async (dispatch) => {
      try {
            dispatch({ type: actionType.NEW_BANNER_REQUEST });

            const config = { header: { "Content-Type": "multipart/form-data" } };
            const { data } = await axios.post("/api/v1/admin/banner/new", bannerData, config);

            dispatch({
                  type: actionType.NEW_BANNER_SUCCESS,
                  payload: data
            })

      } catch (error) {
            dispatch({
                  type: actionType.NEW_BANNER_FAIL,
                  payload: error.response.data.message
            })
      }



}

// get banner
export const getBanner = () => async (dispatch) => {
      try {
            dispatch({ type: actionType.ALL_BANNER_REQUEST });

            const { data } = await axios.get("/api/v1/banner");

            dispatch({
                  type: actionType.ALL_BANNER_SUCCESS,
                  payload: data
            })

      } catch (error) {
            dispatch({
                  type: actionType.ALL_BANNER_FAIL,
                  payload: error.response.data.message
            })
      }
}

// get single banner
export const getBannerDetails = (id) => async (dispatch) => {
      try {
            dispatch({ type: actionType.SINGLE_BANNER_REQUEST });

            const { data } = await axios.get(`/api/v1/banner/${id}`);

            dispatch({
                  type: actionType.SINGLE_BANNER_SUCCESS,
                  payload: data
            })

      } catch (error) {
            dispatch({
                  type: actionType.SINGLE_BANNER_FAIL,
                  payload: error.response.data.message
            })
      }
}

export const deleteBanner = (id) => async (dispatch) => {
      try {
            dispatch({ type: actionType.DELETE_BANNER_REQUEST });

            const { data } = await axios.delete(`/api/v1/admin/banner/${id}`);

            dispatch({
                  type: actionType.DELETE_BANNER_SUCCESS,
                  payload: data
            })

      } catch (error) {
            dispatch({
                  type: actionType.DELETE_BANNER_FAIL,
                  payload: error.response.data.message
            })
      }
}

// updating banner
export const updateBanner = (id, bannerData) => async (dispatch) => {
      try {
            dispatch({ type: actionType.UPDATE_BANNER_REQUEST });
            const config = { headers: { "Content-Type": "multipart/form-data" } };
            const { data } = await axios.put(`/api/v1/admin/update/banner/${id}`, bannerData, config);

            dispatch({
                  type: actionType.UPDATE_BANNER_SUCCESS,
                  payload: data.success
            })
      }
      catch (error) {
            dispatch({
                  type: actionType.UPDATE_BANNER_FAIL,
                  payload: error.response.data.message
            })
      }
}

// clearing errors
export const clearError = () => async (dispatch) => {
      dispatch({
            type: actionType.CLEAR_ERRORS
      })
}