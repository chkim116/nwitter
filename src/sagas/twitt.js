import { dbService } from "fbase";
import firebase from "firebase/app";
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
    ADD_LIKES_FAILURE,
    ADD_LIKES_REQUEST,
    ADD_LIKES_SUCCESS,
    ADD_TWITT_FAILURE,
    ADD_TWITT_REQUEST,
    ADD_TWITT_SUCCESS,
    ADD_UNLIKES_FAILURE,
    ADD_UNLIKES_REQUEST,
    ADD_UNLIKES_SUCCESS,
    DEL_TWITT_FAILURE,
    DEL_TWITT_REQUEST,
    DEL_TWITT_SUCCESS,
} from "modules/twit";
import {
    all,
    call,
    fork,
    put,
    takeEvery,
    takeLatest,
    throttle,
} from "redux-saga/effects";

const postTwitt = (data) => {
    return dbService.collection("nweets").add({ ...data });
};

const deleteTwitt = (id) => {
    return dbService.collection("nweets").doc(id).delete();
};

const addCommentWithTwitt = (comment) => {
    const commentRef = dbService.collection("nweets").doc(comment.id);
    return commentRef.update({
        comments: firebase.firestore.FieldValue.arrayUnion(comment),
    });
};

const addLikeWithTwitt = (payload) => {
    const { id, userId } = payload;
    const likesRef = dbService.collection("nweets").doc(id);
    return likesRef.update({
        likes: firebase.firestore.FieldValue.arrayUnion(userId),
    });
};

const delLikeWithTwitt = (payload) => {
    const { id, userId } = payload;
    const likesRef = dbService.collection("nweets").doc(id);
    return likesRef.update({
        likes: firebase.firestore.FieldValue.arrayRemove(userId),
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
            payload: err.message,
        });
    }
}

function* delTwitt(action) {
    try {
        yield call(deleteTwitt, action.payload);
        yield put({
            type: DEL_TWITT_SUCCESS,
        });
    } catch (err) {
        console.log(err.message);
        yield put({
            type: DEL_TWITT_FAILURE,
            payload: err.message,
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
            payload: err.message,
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
            payload: err.message,
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
            payload: err.message,
        });
    }
}

function* addLike(action) {
    try {
        yield call(addLikeWithTwitt, action.payload);
        yield put({
            type: ADD_LIKES_SUCCESS,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: ADD_LIKES_FAILURE,
            payload: err.message,
        });
    }
}

function* addUnLike(action) {
    try {
        yield call(delLikeWithTwitt, action.payload);
        yield put({
            type: ADD_UNLIKES_SUCCESS,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: ADD_UNLIKES_FAILURE,
            payload: err.message,
        });
    }
}

function* watchTwitt() {
    yield throttle(5000, ADD_TWITT_REQUEST, addTwitt);
}

function* watchDelTwitt() {
    yield takeLatest(DEL_TWITT_REQUEST, delTwitt);
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

function* watchAddLikes() {
    yield takeEvery(ADD_LIKES_REQUEST, addLike);
}

function* watchAddUnLikes() {
    yield takeEvery(ADD_UNLIKES_REQUEST, addUnLike);
}

export default function* twitSaga() {
    yield all([
        fork(watchTwitt),
        fork(watchComment),
        fork(watchGetTwitt),
        fork(watchGetAuthTwitt),
        fork(watchAddLikes),
        fork(watchAddUnLikes),
        fork(watchDelTwitt),
    ]);
}
