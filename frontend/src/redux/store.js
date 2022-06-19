import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productsReducer, productDetailsReducer, newReviewReducer, newProductReducer, productReducer, reviewsReducer, deleteReviewReducer } from "./reducers/productReducer"
import { forgotPasswordReducer, profileReducer, resetPasswordReducer, userDetailsReducer, userReducer, usersReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { myOrderDetailsReducer, myOrdersReducer, newOrderReducer, orderListReducer, orderReducer } from "./reducers/orderReducer"
import { BannerReducer } from "./reducers/bannerReducer";

const reducer = combineReducers({
      products: productsReducer,
      productDetails: productDetailsReducer,
      user: userReducer,
      profile: profileReducer,
      forgotPassword: forgotPasswordReducer,
      resetPassword: resetPasswordReducer,
      cart: cartReducer,
      newOrder: newOrderReducer,
      myOrders: myOrdersReducer,
      orderDetails: myOrderDetailsReducer,
      newReview: newReviewReducer,
      newProduct: newProductReducer,
      product: productReducer,
      orderList: orderListReducer,
      order: orderReducer,
      users: usersReducer,
      userDetails: userDetailsReducer,
      reviews: reviewsReducer,
      review: deleteReviewReducer,
      banners: BannerReducer
});

let initialState = {
      cart: {
            cartItems: localStorage.getItem("cartItems")
                  ? JSON.parse(localStorage.getItem("cartItems"))
                  : [],
            shippingInfo: localStorage.getItem("shippingInfo")
                  ? JSON.parse(localStorage.getItem("shippingInfo"))
                  : [],
      }
};

const middleware = [thunk];

const store = createStore(
      reducer,
      initialState,
      composeWithDevTools(applyMiddleware(...middleware))
);

export default store;