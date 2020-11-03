import { all, fork } from "redux-saga/effects";
import authSaga from "./auth";
import signUpSaga from "./signUp";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(signUpSaga)]);
}
