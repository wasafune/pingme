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

export const follow = (userId, mangaId, subscribe) => {
  return axios.post('/user/follow', { userId, mangaId, subscribe })
}

export const unfollow = (userId, mangaId) => {
  return axios.post('/user/unfollow', { userId, mangaId })
}

export const subscribe = (userId, mangaId) => {
  return axios.post('/user/subscribe', { userId, mangaId })
}

export const unsubscribe = (userId, mangaId) => {
  return axios.post('/user/unsubscribe', { userId, mangaId })
}

export const notificationToggle = (userId, bool) => {
  return axios.post('/user/notification', { userId, bool })
}

export const retrieveMangas = (followingList) => {
  return axios.post('/user/retrieveMangas', { followingList })
}
