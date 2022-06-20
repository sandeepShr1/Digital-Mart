import * as actionType from "../constants/bannerConstants";

export const BannerReducer = (state = { banners: [], banner: {} }, action) => {
      switch (action.type) {
            case actionType.NEW_BANNER_REQUEST:
            case actionType.ALL_BANNER_REQUEST:
            case actionType.DELETE_BANNER_REQUEST:
            case actionType.UPDATE_BANNER_REQUEST:
            case actionType.SINGLE_BANNER_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case actionType.NEW_BANNER_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        success: action.payload.success,
                  }
            case actionType.ALL_BANNER_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        banners: action.payload.banners
                  }

            case actionType.SINGLE_BANNER_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        banner: action.payload.banner
                  }

            case actionType.DELETE_BANNER_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isDeleted: action.payload.success
                  }
            case actionType.UPDATE_BANNER_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isUpdated: action.payload
                  }
            case actionType.NEW_BANNER_FAIL:
            case actionType.ALL_BANNER_FAIL:
            case actionType.DELETE_BANNER_FAIL:
            case actionType.UPDATE_BANNER_FAIL:
            case actionType.SINGLE_BANNER_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case actionType.NEW_BANNER_RESET:
            case actionType.DELETE_BANNER_RESET:
            case actionType.UPDATE_BANNER_RESET:
            case actionType.SINGLE_BANNER_RESET:
                  return {
                        ...state,
                        isDeleted: false,
                        success: null,
                        isUpdated: false,
                        banner: null
                  }
            case actionType.CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null,
                  };


            default:
                  return state;
      }
}
