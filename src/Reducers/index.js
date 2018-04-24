import { combineReducers } from 'redux'

import signup from './signup'
import search from './search'

export default combineReducers({
  users: signup,
  search,
})
