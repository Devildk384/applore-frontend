/** @format */

import { combineReducers } from "redux";
import user from "./userSlice";

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
