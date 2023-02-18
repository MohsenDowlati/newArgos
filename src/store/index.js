import { createStore, compose, applyMiddleware } from "redux";
import { reducers } from "./../reducers/index";
import thunk from "redux-thunk";
import { loadingBarMiddleware } from "react-redux-loading-bar";
import {setItem} from "@/actions/OptionSelect";

// const reduxDevTools =
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(
    reducers,
    compose(applyMiddleware(thunk, loadingBarMiddleware()))
);

//Initialize
store.dispatch(setItem("A"));