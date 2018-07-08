import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'

const configureStore = (preloadedState: any) =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunk, storageMiddleware))

// Storage Middleware

const storageMiddleware = store => next => action => {
  const result = next(action)
  const { items, savedItems } = store.getState().books

  localStorage.setItem('items', JSON.stringify(items))
  localStorage.setItem('savedItems', JSON.stringify(savedItems))

  return result
}

export { configureStore }
