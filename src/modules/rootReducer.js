import { combineReducers } from "redux";
import auth from "./auth";
import twit from "./twit";

const rootReducer = combineReducers({
  auth,
  twit,
});

export default rootReducer;
