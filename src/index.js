import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './Reducers'
import AppRouter from './Router'

const rootEl = document.getElementById('root')

const store = createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  rootEl
)
