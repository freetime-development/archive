import { wrapStore } from 'webext-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'

import rootReducer from './reducers/rootReducer'

const composeEnhancers = composeWithDevTools({ port: 4444 })

export function initializeStore() {
  const store = createStore(
    rootReducer,
    // @ts-ignore
    process.env.NODE_ENV === 'development' ? composeEnhancers(applyMiddleware(thunkMiddleware)) : undefined
  )

  wrapStore(store)

  return store
}
