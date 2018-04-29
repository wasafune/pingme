import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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
      <div>
        <h1>Sign Up</h1>
        <FormikSignupForm handleActions={this.handleActions} />
        <Link href="/auth/login" to="/auth/login">Already a user?</Link>
        <p>
          {user.requestMessage ? user.requestMessage : null}
        </p>
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
