import React from 'react'
import { Switch, Route } from 'react-router-dom'

import MainLayout from './Layouts/MainLayout'
import AuthLayout from './Layouts/AuthLayout'
import './App.scss'

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' component={MainLayout} />
        <Route path='/auth' component={AuthLayout} />
      </Switch>
    )
  }
}

export default App
