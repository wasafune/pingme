import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import FormikSignupForm from './SignupForm'
import { createUser, unmountRequestMessage } from '../../../actions'

class Signup extends React.Component {
  constructor() {
    super()
    this.handleActions = this.handleActions.bind(this)
  }

  componentWillUnmount() {
    this.props.unmountRequestMessage()
  }

  handleActions(values) {
    this.props.createUser(values)
  }

  render() {
    const { user } = this.props
    return (
      <div className="auth-container sign-up">
        <h1>Sign Up</h1>
        <FormikSignupForm
          handleActions={this.handleActions}
          requestMessage={user.requestMessage}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    createUser,
    unmountRequestMessage,
  },
  dispatch,
)

Signup.propTypes = {
  user: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired,
  unmountRequestMessage: PropTypes.func.isRequired,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup)
