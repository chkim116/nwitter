import { combineReducers } from "redux";
import auth from "./auth";
import twit from "./twit";
import signUp from "./signup";
import get from "./get";

const rootReducer = combineReducers({
  auth,
  twit,
  signUp,
  get,
});

export default rootReducer;
