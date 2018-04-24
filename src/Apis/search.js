import axios from 'axios'

export const searchTitle = (params) => {
  return axios.post('/search', params)
}
