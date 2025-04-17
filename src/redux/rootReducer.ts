import { combineReducers } from "redux";
import { monthlyReducer } from "./monthly/reducers";

const rootReducer = combineReducers({ monthly: monthlyReducer });

export default rootReducer;
