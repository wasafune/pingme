import { put, call, takeLatest, all } from 'redux-saga/effects'

// Actions
import {
  createUser, loginUser, loggedInCheck, logoutUser,
  follow, unfollow, subscribe, unsubscribe,
  retrieveMangas
} from '../apis/user.js'

// Constants
import {
  CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAIL,
  LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,
  LOGGED_IN_CHECK, LOGGED_IN_CHECK_SUCCESS, LOGGED_IN_CHECK_FAIL,
  LOGOUT_USER, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL,
  FOLLOW, FOLLOW_FAIL, FOLLOW_SUCCESS,
  UNFOLLOW, UNFOLLOW_FAIL, UNFOLLOW_SUCCESS,
  SUBSCRIBE, SUBSCRIBE_FAIL, SUBSCRIBE_SUCCESS,
  UNSUBSCRIBE, UNSUBSCRIBE_FAIL, UNSUBSCRIBE_SUCCESS,
  RETRIEVE_MANGAS, RETRIEVE_MANGAS_FAIL, RETRIEVE_MANGAS_SUCCESS,
} from '../constants'

// Generators
function* callCreateUser(action) {
  try {
    const response = yield call(createUser, action.userObj)
    if (response.data) {
      yield put({ type: CREATE_USER_SUCCESS })
    } else {
      yield put({ type: CREATE_USER_FAIL })
    }
  } catch (e) {
    yield put({ type: CREATE_USER_FAIL })
  }
}

function* callLoginUser(action) {
  try {
    const response = yield call(loginUser, action.userObj)
    if (response.data) {
      yield put({ type: LOGIN_USER_SUCCESS, userObj: response.data })
    } else {
      yield put({ type: LOGIN_USER_FAIL })
    }
  } catch (e) {
    yield put({ type: LOGIN_USER_FAIL })
  }
}

function* callLoggedInCheck() {
  try {
    const response = yield call(loggedInCheck)
    if (response.data) {
      yield put({ type: LOGGED_IN_CHECK_SUCCESS, userObj: response.data })
    } else {
      yield put({ type: LOGGED_IN_CHECK_FAIL })
    }
  } catch (e) {
    yield put({ type: LOGGED_IN_CHECK_FAIL })
  }
}

function* callLogoutUser() {
  try {
    yield call(logoutUser)
    yield put({ type: LOGOUT_USER_SUCCESS })
  } catch (e) {
    yield put({ type: LOGOUT_USER_FAIL })
  }
}

function* callFollow(action) {
  try {
    const response = yield call(follow, action.userId, action.mangaId, action.subscribe)
    if (response.data) {
      yield put({ type: FOLLOW_SUCCESS, userObj: response.data })
    } else {
      yield put({ type: FOLLOW_FAIL })
    }
  } catch (e) {
    yield put({ type: FOLLOW_FAIL })
  }
}

function* callUnfollow(action) {
  try {
    const response = yield call(unfollow, action.userId, action.mangaId)
    if (response.data) {
      yield put({ type: UNFOLLOW_SUCCESS, userObj: response.data })
    } else {
      yield put({ type: UNFOLLOW_FAIL })
    }
  } catch (e) {
    yield put({ type: UNFOLLOW_FAIL })
  }
}

function* callSubscribe(action) {
  try {
    const response = yield call(subscribe, action.userId, action.mangaId)
    if (response.data) {
      yield put({ type: SUBSCRIBE_SUCCESS, userObj: response.data })
    } else {
      yield put({ type: SUBSCRIBE_FAIL })
    }
  } catch (e) {
    yield put({ type: SUBSCRIBE_FAIL })
  }
}

function* callUnsubscribe(action) {
  try {
    const response = yield call(unsubscribe, action.userId, action.mangaId)
    if (response.data) {
      yield put({ type: UNSUBSCRIBE_SUCCESS, userObj: response.data })
    } else {
      yield put({ type: UNSUBSCRIBE_FAIL })
    }
  } catch (e) {
    yield put({ type: UNSUBSCRIBE_FAIL })
  }
}

function* callRetrieveMangas(action) {
  try {
    const response = yield call(retrieveMangas, action.followingList)
    if (response.data) {
      yield put({ type: RETRIEVE_MANGAS_SUCCESS, retrievedList: response.data })
    } else {
      yield put({ type: RETRIEVE_MANGAS_FAIL })
    }
  } catch (e) {
    yield put({ type: RETRIEVE_MANGAS_FAIL })
  }
}

// Watchers
function* watchUser() {
  yield all([
    takeLatest(CREATE_USER, callCreateUser),
    takeLatest(LOGIN_USER, callLoginUser),
    takeLatest(LOGGED_IN_CHECK, callLoggedInCheck),
    takeLatest(LOGOUT_USER, callLogoutUser),
    takeLatest(FOLLOW, callFollow),
    takeLatest(UNFOLLOW, callUnfollow),
    takeLatest(SUBSCRIBE, callSubscribe),
    takeLatest(UNSUBSCRIBE, callUnsubscribe),
    takeLatest(RETRIEVE_MANGAS, callRetrieveMangas),
  ])
}

export default watchUser
