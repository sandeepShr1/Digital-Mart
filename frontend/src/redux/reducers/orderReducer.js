import * as actionTypes from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
      switch (action.type) {
            case actionTypes.CREATE_ORDER_REQUEST:
                  return {
                        loading: true,
                  };

            case actionTypes.CREATE_ORDER_SUCCESS:
                  return {
                        loading: false,
                        order: action.payload,
                  };

            case actionTypes.CREATE_ORDER_FAIL:
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

export const myOrdersReducer = (state = { orders: [] }, action) => {
      switch (action.type) {
            case actionTypes.MY_ORDERS_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case actionTypes.MY_ORDERS_SUCCESS:
                  return {
                        loading: false,
                        orders: action.payload
                  }

            case actionTypes.MY_ORDERS_FAIL:
                  return {
                        loading: false,
                        error: action.payload
                  }
            case actionTypes.CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null,
                  };


            default:
                  return state;
      }
}


export const myOrderDetailsReducer = (state = { orderDetails: {} }, action) => {
      switch (action.type) {
            case actionTypes.ORDER_DETAILS_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }

            case actionTypes.ORDER_DETAILS_SUCCESS:
                  return {
                        loading: false,
                        orderDetails: action.payload
                  }

            case actionTypes.ORDER_DETAILS_FAIL:
                  return {
                        loading: false,
                        error: action.payload
                  }
            case actionTypes.CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null,
                  };


            default:
                  return state;
      }
}

/// Admin get all orders
export const orderListReducer = (state = { orderList: [] }, action) => {
      switch (action.type) {
            case actionTypes.ADMIN_ORDERS_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case actionTypes.ADMIN_ORDERS_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        orderList: action.payload
                  }
            case actionTypes.ADMIN_ORDERS_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case actionTypes.CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null,
                  };


            default:
                  return state;
      }
}

// update and delete orders admin  
export const orderReducer = (state = {}, action) => {
      switch (action.type) {
            case actionTypes.UPDATE_ORDERS_REQUEST:
            case actionTypes.DELETE_ORDERS_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case actionTypes.UPDATE_ORDERS_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isUpdated: action.payload
                  }
            case actionTypes.DELETE_ORDERS_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isDeleted: action.payload
                  }
            case actionTypes.UPDATE_ORDERS_RESET:
                  return {
                        ...state,
                        loading: false,
                        isUpdated: false
                  }
            case actionTypes.DELETE_ORDERS_RESET:
                  return {
                        ...state,
                        loading: false,
                        isDeleted: false
                  }
            case actionTypes.DELETE_ORDERS_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case actionTypes.CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null,
                  };

            default:
                  return state;
      }
}