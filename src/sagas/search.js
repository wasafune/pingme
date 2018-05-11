import { put, call, takeLatest, all } from 'redux-saga/effects'

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
    const { searchStr, typeStr } = action
    const response = yield call(searchTitle, searchStr, typeStr)
    yield put({ type: SEARCH_TITLE_SUCCESS, searchArr: response.data })
  } catch (e) {
    yield put({ type: SEARCH_TITLE_FAIL, error: e.message })
  }
}

function* callSearchMore(action) {
  try {
    const { searchStr, typeStr, index } = action
    const response = yield call(searchMore, searchStr, typeStr, index)
    yield put({ type: SEARCH_MORE_SUCCESS, searchArr: response.data })
  } catch (e) {
    yield put({ type: SEARCH_MORE_FAIL, error: e.message })
  }
}

// Watchers
function* watchSearch() {
  yield all([
    takeLatest(SEARCH_TITLE, callSearchTitle),
    takeLatest(SEARCH_MORE, callSearchMore),
  ])
}

export default watchSearch
