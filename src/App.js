import React from 'react'
import { Switch, Route } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import './styleSheet/main.scss'

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/auth' component={AuthLayout} />
        <Route path='/' component={MainLayout} />
      </Switch>
    )
  }
}

export default App
