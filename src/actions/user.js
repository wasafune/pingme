import {
  CREATE_USER,
  LOGIN_USER,
  UNMOUNT_REQUEST_MESSAGE,
  LOGOUT_USER,
  LOGGED_IN_CHECK,
} from '../constants'

// Async
export const createUser = (userObj) => ({
  type: CREATE_USER,
  userObj,
})

export const loginUser = (userObj) => ({
  type: LOGIN_USER,
  userObj,
})

export const unmountRequestMessage = () => ({
  type: UNMOUNT_REQUEST_MESSAGE,
})

export const logoutUser = () => ({
  type: LOGOUT_USER,
})

export const loggedInCheck = () => ({
  type: LOGGED_IN_CHECK,
})
