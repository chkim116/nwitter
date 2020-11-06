import { dbService } from "fbase";
import firebase from "firebase";
import {
  GET_AUTH_TWITT_FAILURE,
  GET_AUTH_TWITT_REQUEST,
  GET_AUTH_TWITT_SUCCESS,
} from "modules/auth";
import {
  GET_TWITT_FAILURE,
  GET_TWITT_REQUEST,
  GET_TWITT_SUCCESS,
} from "modules/get";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_TWITT_FAILURE,
  ADD_TWITT_REQUEST,
  ADD_TWITT_SUCCESS,
} from "modules/twit";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";

const postTwitt = (data) => {
  return dbService.collection("nweets").add({ ...data });
};

const addCommentWithTwitt = (comment) => {
  const commentRef = dbService.collection("nweets").doc(comment.id);
  return commentRef.update({
    comments: firebase.firestore.FieldValue.arrayUnion(comment),
  });
};

function* addTwitt(action) {
  try {
    yield call(postTwitt, action.payload);
    yield put({
      type: ADD_TWITT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: ADD_TWITT_FAILURE,
      payload: err,
    });
  }
}

function* getTwitt(action) {
  try {
    yield put({
      type: GET_TWITT_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: GET_TWITT_FAILURE,
      payload: err,
    });
  }
}

function* getAuthTwitt(action) {
  try {
    yield put({
      type: GET_AUTH_TWITT_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: GET_AUTH_TWITT_FAILURE,
      payload: err,
    });
  }
}

function* addComment(action) {
  try {
    yield call(addCommentWithTwitt, action.payload);
    yield put({
      type: ADD_COMMENT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      payload: err,
    });
  }
}

function* watchTwitt() {
  yield takeLatest(ADD_TWITT_REQUEST, addTwitt);
}

function* watchGetTwitt() {
  yield takeLatest(GET_TWITT_REQUEST, getTwitt);
}

function* watchComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchGetAuthTwitt() {
  yield takeLatest(GET_AUTH_TWITT_REQUEST, getAuthTwitt);
}

export default function* twitSaga() {
  yield all([
    fork(watchTwitt),
    fork(watchComment),
    fork(watchGetTwitt),
    fork(watchGetAuthTwitt),
  ]);
}
