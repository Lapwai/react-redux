import React from "react";
import ReactDOM from "react-dom";
import {
  createStore,
  combineRcombineReducers,
  combineReducers,
  compose,
  applyMiddleware
} from "redux";
import thunk from "redux-thunk";
import { get } from "axios";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// 1. create reducer and name it counterReducer and postReducer separately
// 1.1 two arguments are in the reducer, "state" and "action"
// counterReducer aims to count the numbers
const counterReducer = function(state = { count: 7 }, action) {
  switch (action.type) {
    case "COUNT_ADD":
      return { ...state, count: state.count + 7 };
    case "COUNT_REDUCE":
      return { ...state, count: state.count - 6 };
    default:
      return state;
  }
};

//postReducer aims to display data from API
const postReducer = function(
  state = { posts: [{ title: "Post Title" }] },
  action
) {
  switch (action.type) {
    case "GET_POSTS":
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};

//1.2 using "combineReducers" to join two reducers together
const rootReducers = combineReducers({
  couter: counterReducer,
  post: postReducer
});

// 2. create store by "combineReducers"
const store = createStore(
  rootReducers,
  compose(
    applyMiddleware(...[thunk]),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

//getPostRequest()
const getPostRequest = () => {
  //return json promise object
  return get("https://jsonplaceholder.typicode.com/posts");
};

store.dispatch(async function(dispatch) {
  const response = await getPostRequest();
  // console.log(response.data);
  dispatch({
    type: "GET_POSTS",
    payload: response.data
  });
});

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
