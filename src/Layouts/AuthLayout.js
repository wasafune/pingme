import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Login, Signup } from '../components/auth'
import { loggedInCheck } from '../actions'


class AuthLayout extends Component {
  componentDidMount() {
    if (!this.props.user._id.length) {
      this.props.loggedInCheck()
    }
  }

  render() {
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
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loggedInCheck,
  },
  dispatch,
)

AuthLayout.propTypes = {
  user: PropTypes.object.isRequired,
  loggedInCheck: PropTypes.func.isRequired,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthLayout)
