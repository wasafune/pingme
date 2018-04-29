import axios from 'axios'

export const searchTitle = (searchStr) => {
  return axios.post('/search', { searchStr })
}

export const searchMore = (searchStr, index) => {
  return axios.post('/search/more', { searchStr, index })
}
