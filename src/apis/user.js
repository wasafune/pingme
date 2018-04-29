import axios from 'axios'

export const createUser = (params) => {
  return axios.post('/user/signup', params)
}

export const loginUser = (params) => {
  return axios.post('/user/login', params)
}

export const loggedInCheck = () => {
  return axios.get('/user/check')
}

export const logoutUser = () => {
  return axios.get('/user/logout')
}
