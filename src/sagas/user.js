import { put, call, takeLatest, all } from 'redux-saga/effects'

// Actions
import { createUser, loginUser, loggedInCheck, logoutUser } from '../apis/user.js'

// Constants
import {
  CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAIL,
  LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,
  LOGGED_IN_CHECK, LOGGED_IN_CHECK_SUCCESS, LOGGED_IN_CHECK_FAIL,
  LOGOUT_USER, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL,
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

// Watchers
function* watchUser() {
  yield all([
    takeLatest(CREATE_USER, callCreateUser),
    takeLatest(LOGIN_USER, callLoginUser),
    takeLatest(LOGGED_IN_CHECK, callLoggedInCheck),
    takeLatest(LOGOUT_USER, callLogoutUser),
  ])
}

export default watchUser
