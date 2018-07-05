import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import UpdateUserForm from './UpdateUserForm'
import { updateUser, notificationToggle, unmountRequestMessage } from '../../../actions'

// preferences, account, password
// email change needs verification as well (also check if taken)
// change account link in nav to dropdown
class Account extends Component {
  constructor() {
    super()
    this.handleSlider = this.handleSlider.bind(this)
    this.handleUpdateForm = this.handleUpdateForm.bind(this)
  }

  componentWillUnmount() {
    this.props.unmountRequestMessage()
  }

  handleSlider() {
    const { _id, notifications, requestingUser } = this.props.user
    if (requestingUser) return
    this.props.notificationToggle(_id, notifications)
  }

  handleUpdateForm(userObj) {
    const parsedUserObj = Object.keys(userObj).reduce((acc, key) => {
      if (userObj[key].length) acc[key] = userObj[key]
      return acc
    }, {})
    this.props.updateUser(this.props.user._id, parsedUserObj)
  }

  render() {
    const { handleUpdateForm } = this
    const { notifications, email, displayName, requestMessage } = this.props.user
    return (
      <div className="account-container">
        <div className="form-container">
          <h2>Account Settings</h2>
          <UpdateUserForm
            email={email}
            displayName={displayName}
            handleUpdateForm={handleUpdateForm}
          />
        </div>
        <div className="switch-container">
          <h2>Notification Settings</h2>
          <div>
            <h3>Email</h3>
            <label className="switch">
              <input type="checkbox" onClick={this.handleSlider} checked={notifications} />
              <span className="slider round" />
            </label>
          </div>
        </div>
        <Link href="/auth/logout" to="/auth/logout">
          <button>Logout</button>
        </Link>
        <p>
          {requestMessage || ''}
        </p>
      </div>
    )
  }
}

Account.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  unmountRequestMessage: PropTypes.func.isRequired,
  notificationToggle: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateUser,
    notificationToggle,
    unmountRequestMessage,
  },
  dispatch,
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account)
