import { all } from 'redux-saga/effects'

// Actions
import watchCreateUser from './user'
import watchSearchTitle from './search'

export default function* rootSaga() {
  yield all([
    watchCreateUser(),
    watchSearchTitle(),
  ])
}
