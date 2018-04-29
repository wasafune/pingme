import { SEARCH_TITLE, SEARCH_MORE } from '../constants'

// Async
export const searchTitle = (searchStr) => ({
  type: SEARCH_TITLE,
  searchStr,
})

export const searchMore = (searchStr, index) => ({
  type: SEARCH_MORE,
  searchStr,
  index,
})
