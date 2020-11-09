import { authService } from "fbase";
import { all, fork, call, takeLatest, put } from "redux-saga/effects";
import {
  LOGIN_SUBMIT_FAILURE,
  LOGIN_SUBMIT_REQUSET,
  LOGIN_SUBMIT_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUSET,
  LOGOUT_SUCCESS,
} from "../modules/auth";

function* logIn(action) {
  try {
    yield call(
      [authService, authService.signInWithEmailAndPassword],
      action.payload.email,
      action.payload.password
    );
    yield put({
      type: LOGIN_SUBMIT_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOGIN_SUBMIT_FAILURE,
      payload: err.message,
    });
  }
}

function* logOut() {
  try {
    yield call([authService, authService.signOut]);
    yield put({
      type: LOGOUT_SUCCESS,
      payload: null,
    });
  } catch (err) {
    yield put({
      type: LOGOUT_FAILURE,
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_SUBMIT_REQUSET, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOGOUT_REQUSET, logOut);
}

export default function* authSaga() {
  yield all([fork(watchLogin), fork(watchLogOut)]);
}
