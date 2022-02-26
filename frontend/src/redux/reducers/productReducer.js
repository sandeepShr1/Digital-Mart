import * as actionTypes from "../constants/productConstants";


export const productsReducer = (state = { products: [] }, action) => {
      switch (action.type) {
            case actionTypes.ALL_PRODUCT_REQUEST:
                  return {
                        loading: true,
                        products: [],
                  }

            case actionTypes.ALL_PRODUCT_SUCCESS:
                  return {
                        loading: false,
                        products: action.payload.products,
                        productsCount: action.payload.productsCount,
                        resultPerPage: action.payload.resultPerPage,
                        filteredProductsCount: action.payload.filteredProductsCount
                  }
            case actionTypes.ALL_PRODUCT_FAIL:
                  return {
                        loading: false,
                        error: action.payload
                  }
            case actionTypes.CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null
                  }

            default:
                  return state;
      }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
      switch (action.type) {
            case actionTypes.PRODUCT_DETAILS_REQUEST:
                  return {
                        loading: true,
                        ...state
                  };
            case actionTypes.PRODUCT_DETAILS_SUCCESS:
                  return {
                        loading: false,
                        product: action.payload,
                  };
            case actionTypes.PRODUCT_DETAILS_FAIL:
                  return {
                        loading: false,
                        error: action.payload,
                  };

            case actionTypes.CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null,
                  };
            default:
                  return state;
      }
};

// review reducer
export const newReviewReducer = (state = {}, action) => {
      switch (action.type) {
            case actionTypes.NEW_REVIEWS_REQUEST:
                  return {
                        loading: true,
                        ...state
                  };
            case actionTypes.NEW_REVIEWS_SUCCESS:
                  return {
                        loading: false,
                        success: action.payload,
                  };
            case actionTypes.NEW_REVIEWS_FAIL:
                  return {
                        loading: false,
                        error: action.payload,
                  };
            case actionTypes.NEW_REVIEWS_RESET:
                  return {
                        loading: false,
                        success: false,
                  };

            case actionTypes.CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null,
                  };
            default:
                  return state;
      }
};
