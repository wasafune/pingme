// Constants
import {
  SEARCH_TITLE,
  SEARCH_TITLE_SUCCESS,
  SEARCH_TITLE_FAIL,
} from '../constants'

const initialState = {
  searchStr: '',
  searchArr: [],
  searching: false,
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TITLE:
      return {
        ...state,
        searching: true,
      }

    case SEARCH_TITLE_SUCCESS:
      return {
        ...state,
        searchArr: [...action.searchArr],
        searching: false,
      }

    case SEARCH_TITLE_FAIL:
      return {
        ...state,
        searching: false,
      }

    default:
      return state
  }
}

export default search
