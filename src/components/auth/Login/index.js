import React from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import FormikLoginForm from './LoginForm'
import { loginUser, unmountRequestMessage } from '../../../actions'

class Login extends React.Component {
  constructor() {
    super()
    this.handleActions = this.handleActions.bind(this)
  }

  componentWillUnmount() {
    this.props.unmountRequestMessage()
  }

  handleActions(values) {
    this.props.loginUser(values)
  }

  render() {
    const { user } = this.props
    const loginSuccess = (user._id.length !== 0) && (user.requestMessage === 'Login success!')
    return (
      <div>
        <h1>Login</h1>
        {loginSuccess ? <Redirect to="/" /> : null}
        <FormikLoginForm handleActions={this.handleActions} />
        <Link href="/auth/signup" to="/auth/signup">New User?</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loginUser,
    unmountRequestMessage,
  },
  dispatch,
)

Login.propTypes = {
  user: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  unmountRequestMessage: PropTypes.func.isRequired,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
