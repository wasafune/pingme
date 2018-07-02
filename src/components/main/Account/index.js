import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { notificationToggle, unmountRequestMessage } from '../../../actions'


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
        <label className="switch">
          <input type="checkbox" onClick={this.handleSlider} checked={notifications} />
          <span className="slider round" />
        </label>
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
