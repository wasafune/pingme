import * as types from './actionTypes'

const reqUserInfo = (userCreds) => {
  return {
    type: types.REQ_USER_INFO,
    payload: userCreds,
  }
}


module.exports = {
  reqUserInfo,
}
