import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Store, applyMiddleware } from 'webext-redux'
import thunkMiddleware from 'redux-thunk'

import App from './components/App'

const store = applyMiddleware(new Store(), thunkMiddleware)

store.ready().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('app')
  )
}).catch(() => {
  console.log('store failed to initialise')
})
