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

// clearing errors
export const clearError = () => async (dispatch) => {
      dispatch({
            type: actionType.CLEAR_ERRORS
      })
}