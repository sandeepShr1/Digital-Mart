import * as actionTypes from '../constants/userConstants';

export const userReducer = (state = { user: {} }, action) => {
      switch (action.type) {
            case actionTypes.LOGIN_REQUEST:
            case actionTypes.REGISTER_REQUEST:
            case actionTypes.LOAD_USER_REQUEST:
                  return {
                        loading: true,
                        isAuthenticated: false,
                  };
            case actionTypes.LOGIN_SUCCESS:
            case actionTypes.REGISTER_SUCCESS:
            case actionTypes.LOAD_USER_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isAuthenticated: true,
                        user: action.payload,
                  };

            case actionTypes.LOGOUT_SUCCESS:
                  return {
                        loading: false,
                        user: null,
                        isAuthenticated: false,
                  };
            case actionTypes.LOGIN_FAIL:
            case actionTypes.REGISTER_FAIL:
                  return {
                        ...state,
                        loading: false,
                        isAuthenticated: false,
                        user: null,
                        error: action.payload,
                  };

            case actionTypes.LOAD_USER_FAIL:
                  return {
                        loading: false,
                        isAuthenticated: false,
                        user: null,
                        error: action.payload,
                  };

            case actionTypes.LOGOUT_FAIL:
                  return {
                        ...state,
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

export const profileReducer = (state = {}, action) => {
      switch (action.type) {
            case actionTypes.UPDATE_PROFILE_REQUEST:
                  return {
                        ...state,
                        loading: true,

                  }
            case actionTypes.UPDATE_PROFILE_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isUpdated: action.payload

                  }
            case actionTypes.UPDATE_PROFILE_RESET:
                  return {
                        ...state,
                        loading: false,
                        isUpdated: false

                  }
            case actionTypes.UPDATE_PROFILE_FAIL:
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
