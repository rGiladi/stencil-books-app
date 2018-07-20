
export const START_SEARCH = 'START_SEARCH'
const startSearch = () => ({ type: START_SEARCH })

export const SET_REQUEST_ERROR = 'SET_REQUEST_ERROR'
const setRequestError = (error) => ({ type: SET_REQUEST_ERROR, error })

export const SET_BOOKS = 'SET_BOOKS'
const setBooks = (items) => ({ type: SET_BOOKS, items })

export function searchBooks(query) {
  return dispatch => {
    dispatch(startSearch())

    const serializedQuery = query.split(' ').join('+')
    const url = `https://www.googleapis.com/books/v1/volumes?q=${serializedQuery}&maxResults=40`

    fetch(url)
      .then(
        res => res.json(),
        () => dispatch(setRequestError('An unexpected problem occured'))
      )
      .then(data => {
        if (!data.items) {
          dispatch(setRequestError('No results...'))
        } else {
          dispatch(setBooks(data.items))
        }
      })
  }
}

export const SAVE_BOOK = 'SAVE_BOOK'
export const saveBook = (book) => {
  return dispatch => dispatch({ type: SAVE_BOOK, book })
}

export const REMOVE_BOOK = 'REMOVE_BOOK'
export const removeBook = (book) => {
  return dispatch => dispatch({ type: REMOVE_BOOK, book })
}
