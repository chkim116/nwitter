import { authService } from "fbase";
import { LOGIN_SUBMIT_SUCCESS } from "modules/auth";
import {
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "modules/signup";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";

function* signUps(action) {
  try {
    yield call(
      [authService, authService.createUserWithEmailAndPassword],
      action.payload.email,
      action.payload.password
    );
    const data = yield call(
      [authService, authService.signInWithEmailAndPassword],
      action.payload.email,
      action.payload.password
    );
    yield put({
      type: SIGN_UP_SUCCESS,
    });
    yield put({
      type: LOGIN_SUBMIT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      payload: err.message,
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUps);
}

export default function* signUpSaga() {
  yield all([fork(watchSignUp)]);
}
