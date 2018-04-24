import { put, all, call, takeLatest } from 'redux-saga/effects'

// Actions
import { createUser } from '../Apis/auth.js'

// Constants
import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
} from '../constants'

// * Generators *
function* callCreateUser(action) {
  try {
    const response = yield call(createUser, action.user)
    yield put({ type: CREATE_USER_SUCCESS, user: response.data })
  } catch (e) {
    yield put({ type: CREATE_USER_FAIL, error: e.message })
  }
}

// example saga
// function* reqUserInfo(action) {
//   const res = yield call(axiosPost, '/user/test', action.payload)
//   // api req success; fire success action
//   if (res.request.status === 200 && res.data) {
//     yield put({
//       type: types.REQ_USER_INFO_SUCCESS,
//       payload: res.data,
//     })
//   } else {
//     // api req fail; fire fail action
//     const { status, statusText } = res.request
//     yield put({
//       type: types.REQ_USER_INFO_FAIL,
//       payload: { status, statusText },
//     })
//   }
// }

// * Watchers *
function* watchCreateUser() {
  yield takeLatest(CREATE_USER, callCreateUser)
}

// function* watchReqUserInfo() {
//   yield takeEvery(types.REQ_USER_INFO, reqUserInfo)
// }

export default function* rootSaga() {
  yield all([
    watchCreateUser(),
  ])
}
