import axios from 'axios'

export const createUser = (params) => {
  axios.post('/user/signup', params)
}
