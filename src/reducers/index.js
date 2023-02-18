import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import {optionReducer} from "@/reducers/option";

export const reducers = combineReducers({
    option: optionReducer,
    loadingBar: loadingBarReducer
});
