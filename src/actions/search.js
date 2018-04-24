import { SEARCH_TITLE } from '../constants'

// Async
export const searchTitle = (searchStr) => ({
  type: SEARCH_TITLE,
  searchObj: { searchStr },
})
