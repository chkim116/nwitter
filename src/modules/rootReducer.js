import { combineReducers } from "redux";
import auth from "./auth";
import twit from "./twit";
import signUp from "./signup";

const rootReducer = combineReducers({
  auth,
  twit,
  signUp,
});

export default rootReducer;
