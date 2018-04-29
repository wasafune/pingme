import { put, call, takeLatest } from 'redux-saga/effects'

// Actions
import { searchTitle, searchMore } from '../apis/search'

// Constants
import {
  SEARCH_TITLE, SEARCH_TITLE_SUCCESS, SEARCH_TITLE_FAIL,
  SEARCH_MORE, SEARCH_MORE_SUCCESS, SEARCH_MORE_FAIL,
} from '../constants'

// Generators
function* callSearchTitle(action) {
  try {
    const response = yield call(searchTitle, action.searchStr)
    yield put({ type: SEARCH_TITLE_SUCCESS, searchArr: response.data })
  } catch (e) {
    yield put({ type: SEARCH_TITLE_FAIL, error: e.message })
  }
}

function* callSearchMore(action) {
  try {
    const response = yield call(searchMore, action.searchStr, action.index)
    yield put({ type: SEARCH_MORE_SUCCESS, searchArr: response.data })
  } catch (e) {
    yield put({ type: SEARCH_MORE_FAIL, error: e.message })
  }
}

// Watchers
function* watchSearchTitle() {
  yield takeLatest(SEARCH_TITLE, callSearchTitle)
  yield takeLatest(SEARCH_MORE, callSearchMore)
}

export default watchSearchTitle
