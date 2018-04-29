import { all } from 'redux-saga/effects'

// Actions
import watchUser from './user'
import watchSearch from './search'

export default function* rootSaga() {
  yield all([
    watchUser(),
    watchSearch(),
  ])
}
