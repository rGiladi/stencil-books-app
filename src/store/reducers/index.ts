import { combineReducers } from 'redux'
import * as actions from '../actions/index'

const booksState = {
  items: [],
  savedItems: [],
  fetchError: '',
  isFetching: false
}

function books(state = booksState, action) {
  const { type, items, error, book } = action

  switch(type) {
    case actions.START_SEARCH:
      return {
        ...state,
        isFetching: true
      }
    case actions.SET_REQUEST_ERROR:
      return {
        ...state,
        fetchError: error,
        isFetching: false
      }
    case actions.SET_BOOKS:
      return {
        ...state,
        items,
        fetchError: null,
        isFetching: false
      }
    case actions.SAVE_BOOK:
      return {
        ...state,
        savedItems: [...state.savedItems, book]
      }
    case actions.REMOVE_BOOK:
      return {
        ...state,
        savedItems: state.savedItems.filter(item => item.id !== book.id)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({ books })

export default rootReducer
