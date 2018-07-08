
export const START_SEARCH = 'START_SEARCH'
function startSearch() {
  return {
    type: START_SEARCH
  }
}

export const SET_REQUEST_ERROR = 'SET_REQUEST_ERROR'
function setRequestError(error) {
  return {
    type: SET_REQUEST_ERROR,
    error
  }
}

export const SET_BOOKS = 'SET_BOOKS'
function setBooks(items) {
  return {
    type: SET_BOOKS,
    items
  }
}

export function searchBooks(query) {
  return dispatch => {
    dispatch(startSearch())

    const defaultErrorMessage = 'An unexpected problem occured'
    const serializedQuery = query.split('').join('+')
    const url = `https://www.googleapis.com/books/v1/volumes?q=${serializedQuery}&maxResults=40`

    fetch(url)
      .then(
        res => res.json(),
        () => dispatch(setRequestError(defaultErrorMessage))
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
export function saveBook(book) {
  return dispatch => {
    dispatch({
      type: SAVE_BOOK,
      book
    })
  }
}

export const REMOVE_BOOK = 'REMOVE_BOOK'
export function removeBook(book) {
  return dispatch => {
    return dispatch({
      type: REMOVE_BOOK,
      book
    })
  }
}
