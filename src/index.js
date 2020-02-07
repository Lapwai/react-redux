import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

//action, reducer, store(state)

const counterReducer = function(state = { count: 1 }, action) {
  switch (action.type) {
    case "COUNT_ADD":
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};

const store = createStore(
  counterReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
console.log(store.getState());

store.dispatch({
  type: "COUNT_ADD",
  payload: {}
});
console.log(store.getState());

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
