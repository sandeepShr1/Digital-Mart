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
                        productsCount: action.payload.productsCount
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
