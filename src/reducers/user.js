import cloneDeep from 'lodash/cloneDeep'

// Constants
import {
  CREATE_USER, CREATE_USER_FAIL, CREATE_USER_SUCCESS,
  LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS,
  LOGGED_IN_CHECK, LOGGED_IN_CHECK_FAIL, LOGGED_IN_CHECK_SUCCESS,
  LOGOUT_USER, LOGOUT_USER_FAIL, LOGOUT_USER_SUCCESS,
  UNMOUNT_REQUEST_MESSAGE,
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
      ...state,
      ...action.userObj,
      requestingUser: false,
      requestMessage: 'Login success!',
      followingList: cloneDeep(action.userObj.followingList),
      config: cloneDeep(action.userObj.config),
    }
    case LOGIN_USER_FAIL: return {
      ...state,
      requestingUser: false,
      requestMessage: 'Login failed.',
    }
    case LOGGED_IN_CHECK: return {
      ...state,
      requestingUser: true,
    }
    case LOGGED_IN_CHECK_SUCCESS: return {
      ...state,
      ...action.userObj,
      requestingUser: false,
      followingList: cloneDeep(action.userObj.followingList),
      config: cloneDeep(action.userObj.config),
    }
    case LOGGED_IN_CHECK_FAIL: return {
      ...state,
      requestingUser: false,
    }
    case LOGOUT_USER: return {
      ...state,
      requestingUser: true,
    }
    case LOGOUT_USER_SUCCESS: return {
      ...initialState,
      requestMessage: 'Logout successful.',
    }
    case LOGOUT_USER_FAIL: return {
      ...state,
      requestMessage: 'Logout failed.',
      requestingUser: false,
    }
    case UNMOUNT_REQUEST_MESSAGE: return {
      ...state,
      requestMessage: null,
    }
    default: return state
  }
}

export default user
