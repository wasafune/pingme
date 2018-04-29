import cloneDeep from 'lodash/cloneDeep'

// Constants
import {
  SEARCH_TITLE, SEARCH_TITLE_SUCCESS, SEARCH_TITLE_FAIL,
  SEARCH_MORE, SEARCH_MORE_SUCCESS, SEARCH_MORE_FAIL,
} from '../constants'

const initialState = {
  searchStr: '',
  searchArr: [],
  searchEnd: false,
  searching: false,
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TITLE:
      return {
        ...state,
        searchStr: action.searchStr,
        searchEnd: false,
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
    case SEARCH_MORE:
      return {
        ...state,
        searchEnd: false,
        searching: true,
      }
    case SEARCH_MORE_SUCCESS:
      return {
        ...state,
        searching: false,
        searchEnd: action.searchArr.length === 0,
        searchArr: cloneDeep(state.searchArr).concat(action.searchArr),
      }
    case SEARCH_MORE_FAIL:
      return {
        ...state,
        searching: false,
      }
    default:
      return state
  }
}

export default search
