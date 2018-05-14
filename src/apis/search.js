import axios from 'axios'

export const searchTitle = (searchStr, typeStr) => {
  return axios.post('/search', { searchStr, typeStr })
}

export const searchMore = (searchStr, typeStr, index) => {
  return axios.post('/search/more', { searchStr, typeStr, index })
}
