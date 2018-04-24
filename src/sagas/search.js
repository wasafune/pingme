import { put, call, takeLatest } from 'redux-saga/effects'

// Actions
import { searchTitle } from '../Apis/search'

// Constants
import {
  SEARCH_TITLE,
  SEARCH_TITLE_SUCCESS,
  SEARCH_TITLE_FAIL,
} from '../constants'

// Generators
function* callSearchTitle(action) {
  try {
    const response = yield call(searchTitle, action.searchObj)
    yield put({ type: SEARCH_TITLE_SUCCESS, searchArr: response.data })
  } catch (e) {
    yield put({ type: SEARCH_TITLE_FAIL, error: e.message })
  }
}

// Watchers
function* watchSearchTitle() {
  yield takeLatest(SEARCH_TITLE, callSearchTitle)
}

export default watchSearchTitle
