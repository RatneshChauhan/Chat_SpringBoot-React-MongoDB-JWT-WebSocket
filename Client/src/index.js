
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import store from './store';
import EventBus from "./common-utils/EventBus";
import { clearError, setError } from "./actions/error-action";
import { clearMessage } from "./actions/message-action";

const root = ReactDOM.createRoot(document.getElementById('root'));

// For GET requests
axios.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    console.log('GET Error:', err)
    return Promise.reject(err);
  }
);
// For POST requests
axios.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      store.dispatch(clearError())
      console.log('Posted Successfully', res);
    }
    return res;
  },
  (error) => {
    console.log('POST Error:', error.response)
    if (error.response && error.response.status === 401) {
      EventBus.dispatch("logout");
    }
    store.dispatch(setError(error.response.status, error.response.data.message))
    store.dispatch(clearMessage())
    return Promise.reject(error);
  }
);
root.render(
  <React.Fragment>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export { useState };
