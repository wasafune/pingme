import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import AppRouter from './Router'

const rootEl = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  rootEl,
)
