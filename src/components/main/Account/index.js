import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { notificationToggle, unmountRequestMessage } from '../../../actions'

// preferences, account, password
// email change needs verification as well (also check if taken)
// change account link in nav to dropdown
class Account extends Component {
  constructor() {
    super()
    this.handleSlider = this.handleSlider.bind(this)
  }

  componentWillUnmount() {
    this.props.unmountRequestMessage()
  }

  handleSlider() {
    const { _id, notifications, requestingUser } = this.props.user
    if (requestingUser) return
    this.props.notificationToggle(_id, notifications)
  }
  render() {
    const { notifications } = this.props.user
    return (
      <div className="account-container">
        <h2>Account Settings</h2>
        <div className="switch-container">
          <h3>Email Notifications</h3>
          <label className="switch">
            <input type="checkbox" onClick={this.handleSlider} checked={notifications} />
            <span className="slider round" />
          </label>
        </div>
        <Link href="/auth/logout" to="/auth/logout">
          Logout
        </Link>
      </div>
    )
  }
}

Account.propTypes = {
  user: PropTypes.object.isRequired,
  unmountRequestMessage: PropTypes.func.isRequired,
  notificationToggle: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    notificationToggle,
    unmountRequestMessage,
  },
  dispatch,
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account)
