import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logoutUser } from '../../../actions'

class Logout extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    if (this.props.user._id.length) {
      this.props.logoutUser()
    }
  }

  handleClick() {
    if (this.props.user.requestMessage === 'Logout failed.') {
      this.props.logoutUser()
    }
  }

  render() {
    const { handleClick } = this
    const { user } = this.props
    const [logoutMessage, logoutRoute] = user.requestMessage === 'Logout successful.'
      ? ['Login', '/auth/login']
      : ['Logout failed. Try again.', '/auth/logout']
    return (
      <div className="logout-container">
        <h1>Logging Out...</h1>
        {user._id.length ? null : <Redirect to="/auth/login" />}
        {
          user.requestMessage
            ? (
              <Link href={logoutRoute} to={logoutRoute} onClick={handleClick}>
                {logoutMessage}
              </Link>
            )
            : (
              null
            )
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    logoutUser,
  },
  dispatch,
)

Logout.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout)
