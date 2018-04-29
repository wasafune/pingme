import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Login, Signup } from '../components/auth'

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      AUTH LAYOUT
      <Switch>
        <Route exact path='/auth/signup' component={Signup} />
        <Route exact path='/auth/login' component={Login} />
      </Switch>
    </div>
  )
}

export default AuthLayout
