import { put, call, takeLatest } from 'redux-saga/effects'

// Actions
import { createUser } from '../Apis/auth.js'

// Constants
import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
} from '../constants'

// Generators
function* callCreateUser(action) {
  try {
    const response = yield call(createUser, action.user)
    yield put({ type: CREATE_USER_SUCCESS, user: response.data })
  } catch (e) {
    yield put({ type: CREATE_USER_FAIL, error: e.message })
  }
}

// Watchers
function* watchCreateUser() {
  yield takeLatest(CREATE_USER, callCreateUser)
}

export default watchCreateUser
