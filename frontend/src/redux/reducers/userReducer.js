import * as actionType from '../constants/userConstants';

export const userReducer = (state = { user: {} }, action) => {

      switch (action.type) {
            case actionType.LOGIN_REQUEST:
            case actionType.REGISTER_REQUEST:
                  return {
                        loading: true,
                        isAuthenticated: false,
                  }
            case actionType.LOGIN_SUCCESS:
            case actionType.REGISTER_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isAuthenticated: true,
                        user: action.payload
                  }
            case actionType.LOGIN_FAIL:
            case actionType.REGISTER_FAIL:
                  return {
                        ...state,
                        loading: false,
                        isAuthenticated: false,
                        user: null,
                        error: action.payload
                  }
            case actionType.CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null,
                  }

            default:
                  return state
      }
}
