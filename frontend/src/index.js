import { Suspense } from "react"
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux/store";
import { positions, transitions, Provider as AlertProvider } from "react-alert"
import AlertTemplate from "react-alert-template-basic";
import Loader from './components/layout/Loader/Loader';


const options = {
  timeout: 5000,
  positions: positions.TOP_RIGHT,
  transitions: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Loader />}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);