import cloneDeep from 'lodash/cloneDeep'

// Constants
import {
  CREATE_USER, CREATE_USER_FAIL, CREATE_USER_SUCCESS,
  LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS,
  UNMOUNT_REQUEST_MESSAGE, LOGOUT_USER,
} from '../constants'

const initialState = {
  _id: '',
  displayName: '',
  email: '',
  isVerified: true,
  followingList: [],
  followingCount: 0,
  config: {},
  admin: false,
  requestingUser: false,
  requestMessage: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER: return {
      ...state,
      requestingUser: true,
    }
    case CREATE_USER_SUCCESS: return {
      ...state,
      requestingUser: false,
      requestMessage: 'User successfully created!',
    }
    case CREATE_USER_FAIL: return {
      ...state,
      requestingUser: false,
      requestMessage: 'User creation failed.',
    }
    case LOGIN_USER: return {
      ...state,
      requestingUser: true,
    }
    case LOGIN_USER_SUCCESS: return {
      ...action.userObj,
      followingList: cloneDeep(action.userObj.followingList),
      config: cloneDeep(action.userObj.config),
    }
    case LOGIN_USER_FAIL: return {
      ...state,
      requestingUser: false,
      requestMessage: 'Login failed.',
    }
    case UNMOUNT_REQUEST_MESSAGE: return {
      ...state,
      requestMessage: null,
    }
    case LOGOUT_USER: return {
      ...initialState,
    }
    default: return state
  }
}

export default user
