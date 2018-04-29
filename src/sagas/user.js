import { put, call, takeLatest, all } from 'redux-saga/effects'

// Actions
import { createUser, loginUser } from '../apis/user.js'

// Constants
import {
  CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAIL,
  LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,
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

// Watchers
function* watchUser() {
  yield all([
    takeLatest(CREATE_USER, callCreateUser),
    takeLatest(LOGIN_USER, callLoginUser),
  ])
}

export default watchUser
