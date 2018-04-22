import { put, takeEvery, all, call } from 'redux-saga/effects'
import axios from 'axios'

import * as types from '../actions/actionTypes'

// * Helper Functions *
const axiosPost = async (route, payload) => {
  try {
    const res = await axios.post(route, payload)
    return res
  } catch (err) {
    return err
  }
}

// * Generators *

// example saga
function* reqUserInfo(action) {
  const res = yield call(axiosPost, '/user/test', action.payload)
  // api req success; fire success action
  if (res.request.status === 200 && res.data) {
    yield put({
      type: types.REQ_USER_INFO_SUCCESS,
      payload: res.data,
    })
  } else {
    // api req fail; fire fail action
    const { status, statusText } = res.request
    yield put({
      type: types.REQ_USER_INFO_FAIL,
      payload: { status, statusText },
    })
  }
}

// * Watchers *
function* watchReqUserInfo() {
  yield takeEvery(types.REQ_USER_INFO, reqUserInfo)
}

export default function* rootSaga() {
  yield all([
    watchReqUserInfo(),
  ])
}
