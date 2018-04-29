import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
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
    return (
      <div>
        <h1>Login</h1>
        {(user._id.length !== 0) ? <Redirect to="/" /> : null}
        <FormikLoginForm handleActions={this.handleActions} />
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
