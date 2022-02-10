import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productReducer } from "./reducers/productReducer";

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const rootReducer = combineReducers({
      products: productReducer
});

let initialState = {};

const middleware = [thunk]

const store = createStore(rootReducer, initialState, composeEnhancers(
      applyMiddleware(...middleware)
));

export default store;