import * as actionTypes from "../constants/productConstants";



// new product reducer admin
export const newProductReducer = (state = { product: {} }, action) => {
      switch (action.type) {
            case actionTypes.NEW_PRODUCT_REQUEST:
                  return {
                        ...state,
                        loading: true,
                  };
            case actionTypes.NEW_PRODUCT_SUCCESS:
                  return {
                        loading: false,
                        success: action.payload.success,
                        product: action.payload.product,
                  };
            case actionTypes.NEW_PRODUCT_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload,
                  };
            case actionTypes.NEW_PRODUCT_RESET:
                  return {
                        ...state,
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

// get products
export const productsReducer = (state = { products: [] }, action) => {
      switch (action.type) {
            case actionTypes.ALL_PRODUCT_REQUEST:
            case actionTypes.ADMIN_PRODUCT_REQUEST:
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
            case actionTypes.ADMIN_PRODUCT_SUCCESS:
                  return {
                        loading: false,
                        products: action.payload
                  }
            case actionTypes.ALL_PRODUCT_FAIL:
            case actionTypes.ADMIN_PRODUCT_FAIL:
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

export const productDetailsReducer = (state = { product: {}, similarProducts: [] }, action) => {
      switch (action.type) {
            case actionTypes.PRODUCT_DETAILS_REQUEST:
                  return {
                        loading: true,
                        ...state
                  };
            case actionTypes.PRODUCT_DETAILS_SUCCESS:
                  return {
                        loading: false,
                        product: action.payload.product,
                        similarProducts: action.payload.similarProducts,
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

// Delete product admin

export const productReducer = (state = {}, action) => {
      switch (action.type) {
            case actionTypes.DELETE_PRODUCT_REQUEST:
            case actionTypes.UPDATE_PRODUCT_REQUEST:
                  return {
                        ...state,
                        loading: true,
                  };
            case actionTypes.DELETE_PRODUCT_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isDeleted: action.payload,
                  };

            case actionTypes.UPDATE_PRODUCT_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isUpdated: action.payload
                  }

            case actionTypes.DELETE_PRODUCT_FAIL:
            case actionTypes.UPDATE_PRODUCT_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload,
                  };
            case actionTypes.DELETE_PRODUCT_RESET:
                  return {
                        ...state,
                        isDeleted: false,
                  };

            case actionTypes.UPDATE_PRODUCT_RESET:
                  return {
                        ...state,
                        loading: false,
                        isUpdated: false
                  }

            case actionTypes.CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null,
                  };
            default:
                  return state;
      }
};

// get Reviews admin
export const reviewsReducer = (state = { reviews: [] }, action) => {
      switch (action.type) {
            case actionTypes.GET_REVIEWS_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case actionTypes.GET_REVIEWS_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        reviews: action.payload
                  }
            case actionTypes.GET_REVIEWS_FAIL:
                  return {
                        ...state,
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
}

// delete review reducer
export const deleteReviewReducer = (state = {}, action) => {
      switch (action.type) {
            case actionTypes.DELETE_REVIEWS_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case actionTypes.DELETE_REVIEWS_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isDeleted: action.payload
                  }
            case actionTypes.DELETE_REVIEWS_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }

            case actionTypes.DELETE_REVIEWS_RESET:
                  return {
                        ...state,
                        loading: false,
                        isDeleted: false
                  }
            case actionTypes.CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null
                  }

            default:
                  return state;
      }
}
