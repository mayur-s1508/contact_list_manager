import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebase from "firebase";
import reducer from "./reducer/reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import firebaseConfig from "./firebase";
firebase.initializeApp(firebaseConfig);
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
