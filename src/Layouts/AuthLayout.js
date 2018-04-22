import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Login, Signup } from '../Components/Auth'

const AuthLayout = () => {
  return (
    <div>
      AUTH LAYOUT
      <Switch>
        <Route exact path='/auth/signup' component={Signup} />
        <Route exact path='/auth/login' component={Login} />
      </Switch>
    </div>
  )
}

export default AuthLayout
