import { SEARCH_TITLE, SEARCH_MORE } from '../constants'

// Async
export const searchTitle = (searchStr, typeStr) => ({
  type: SEARCH_TITLE,
  searchStr,
  typeStr,
})

export const searchMore = (searchStr, typeStr, index) => ({
  type: SEARCH_MORE,
  searchStr,
  typeStr,
  index,
})
