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