import { all, fork } from "redux-saga/effects";
import authSaga from "./auth";
import signUpSaga from "./signUp";
import twitSaga from "./twitt";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(signUpSaga), fork(twitSaga)]);
}
