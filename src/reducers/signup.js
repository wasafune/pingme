// Constants
import {
  CREATE_USER,
  CREATE_USER_FAIL,
  CREATE_USER_SUCCESS,
} from '../constants'

const initialState = {
  userName: '',
  email: '',
  isVerified: true,
  followingList: [],
  followingCount: 0,
  config: {},
  firstName: '',
  admin: false,
  creatingUser: false,
};

const signup = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        creatingUser: true,
      }

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        ...action.user,
        creatingUser: false,
      }

    case CREATE_USER_FAIL:
      return {
        ...state,
        creatingUser: false,
      }

    default:
      return state
  }
}

export default signup
