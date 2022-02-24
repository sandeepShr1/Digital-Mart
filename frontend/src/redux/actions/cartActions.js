import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

// add items to cart
export const addToCart = (id, quantity) => async (dispatch, getState) => {

      const { data } = await axios.get(`/api/v1/product/${id}`)

      dispatch({
            type: actionTypes.ADD_TO_CART,
            payload: {
                  product: data.product._id,
                  name: data.product.name,
                  price: data.product.price,
                  image: data.product.images[0].url,
                  stock: data.product.stock,
                  quantity
            }
      });

      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))

}

// remove from cart

export const removeFromCart = (id) => async (dispatch, getState) => {
      dispatch({
            type: actionTypes.REMOVE_FROM_CART,
            payload: id
      });
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))

}

// Save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {
      dispatch({
            type: actionTypes.SAVE_SHIPPING_INFO,
            payload: data
      })

      localStorage.setItem("shippingInfo", JSON.stringify(data))
}

