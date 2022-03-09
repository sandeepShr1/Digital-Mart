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
            case actionTypes.UPDATE_PASSWORD_REQUEST:
            case actionTypes.DELETE_USER_REQUEST:
                  return {
                        ...state,
                        loading: true,

                  }
            case actionTypes.UPDATE_PROFILE_SUCCESS:
            case actionTypes.UPDATE_PASSWORD_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isUpdated: action.payload

                  }
            case actionTypes.DELETE_USER_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isDeleted: action.payload
                  }
            case actionTypes.UPDATE_PROFILE_RESET:
            case actionTypes.UPDATE_PASSWORD_RESET:
                  return {
                        ...state,
                        loading: false,
                        isUpdated: false

                  }
            case actionTypes.DELETE_USER_RESET:
                  return {
                        ...state,
                        loading: false,
                        isDeleted: false
                  }

            case actionTypes.UPDATE_PROFILE_FAIL:
            case actionTypes.UPDATE_PASSWORD_FAIL:
            case actionTypes.DELETE_USER_FAIL:
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

// Forgot password 
export const forgotPasswordReducer = (state = {}, action) => {
      switch (action.type) {
            case actionTypes.FORGOT_PASSWORD_REQUEST:
                  return {
                        ...state,
                        loading: true,
                        error: null
                  }
            case actionTypes.FORGOT_PASSWORD_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        message: action.payload

                  }
            case actionTypes.FORGOT_PASSWORD_FAIL:
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

// Forgot password 
export const resetPasswordReducer = (state = {}, action) => {
      switch (action.type) {
            case actionTypes.RESET_PASSWORD_REQUEST:
                  return {
                        ...state,
                        loading: true,
                        error: null
                  }
            case actionTypes.RESET_PASSWORD_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        success: action.payload

                  }
            case actionTypes.RESET_PASSWORD_FAIL:
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

//ADMIN get all users
export const usersReducer = (state = { users: [] }, action) => {
      switch (action.type) {
            case actionTypes.GET_USERS_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case actionTypes.GET_USERS_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        users: action.payload
                  }
            case actionTypes.GET_USERS_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.error
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

// admin update user
export const userDetailsReducer = (state = { user: {} }, action) => {

      switch (action.type) {
            case actionTypes.EDIT_USER_REQUEST:
            case actionTypes.GET_USER_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case actionTypes.EDIT_USER_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isUpdated: action.payload
                  }
            case actionTypes.GET_USER_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        user: action.payload
                  }
            case actionTypes.EDIT_USER_RESET:
                  return {
                        ...state,
                        loading: false,
                        isUpdated: false
                  }
            case actionTypes.EDIT_USER_FAIL:
            case actionTypes.GET_USER_FAIL:
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