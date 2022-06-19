import * as actionType from "../constants/bannerConstants";

export const BannerReducer = (state = { banners: [], banner: {} }, action) => {
      switch (action.type) {
            case actionType.NEW_BANNER_REQUEST:
            case actionType.ALL_BANNER_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case actionType.NEW_BANNER_SUCCESS:
                  return {
                        ...state,
                        success: action.payload.success,
                        banner: action.payload.banner
                  }
            case actionType.ALL_BANNER_SUCCESS:
                  return {
                        ...state,
                        banners: action.payload.banners
                  }
            case actionType.NEW_BANNER_FAIL:
            case actionType.ALL_BANNER_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case actionType.NEW_BANNER_RESET:
                  return {
                        ...state,
                        success: null
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