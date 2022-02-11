import { combineReducers } from "redux";
import { productDetailsReducer, productReducer } from "./productReducer";

const rootReducer = combineReducers({
      products: productReducer,
      productDetails: productDetailsReducer,
})

export default rootReducer;