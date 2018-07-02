import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { offNotification } from '../../../actions'

class Unsub extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
    }
  }
  async componentDidMount() {
    const { location, user } = this.props
    const email = location.search.slice(1)
    const hash = location.hash.slice(1)
    await axios.post('/user/unsub', { email, hash })
    if (user._id.length) {
      this.props.offNotification()
    }
    this.setState({ email })
  }
  render() {
    const { email } = this.state
    const emailMsg = email.length
      ? `${email} has successfully opted out of email notifications.`
      : null
    return (
      <div>
        {emailMsg}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    offNotification,
  },
  dispatch,
)

Unsub.propTypes = {
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  offNotification: PropTypes.func.isRequired,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Unsub)
