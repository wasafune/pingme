import * as types from '../actions/actionTypes';

const initialState = {
  userName: '',
  email: '',
  isVerified: true,
  followingList: [],
  followingCount: 0,
  config: {},
  firstName: '',
  admin: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REQ_USER_INFO_SUCCESS:
      return {
        ...state,
        ...action.payload,
        // followingList: [...action.payload.followingList],
        // config: { ...action.payload.followingList },
      }
    case types.REQ_USER_INFO_FAIL:
      return { ...state }
    default:
      return state
  }
}

export default usersReducer;
