import * as actionTypes from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
      switch (action.type) {
            case actionTypes.ADD_TO_CART:
                  const item = action.payload;
                  const isItemExist = state.cartItems.find(
                        (i) => i.product === item.product
                  );

                  if (isItemExist) {
                        return {
                              ...state,
                              cartItems: state.cartItems.map((i) =>
                                    i.product === isItemExist.product ? item : i),

                        }
                  } else {
                        return {
                              ...state,
                              cartItems: [...state.cartItems, item]
                        }
                  }

            case (actionTypes.REMOVE_FROM_CART):
                  return {
                        ...state,
                        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
                  }

            default:
                  return state;
      }
}