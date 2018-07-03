import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'

import { offNotification } from '../../../actions'

class Unsub extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      error: '',
    }
  }
  async componentDidMount() {
    const { location, user } = this.props
    const email = location.search.slice(1)
    const hash = location.hash.slice(1)
    try {
      await axios.post('/user/unsub', { email, hash })
      if (user.email === email) {
        this.props.offNotification()
      }
      this.setState({ email })
    } catch (err) {
      console.error(err)
      this.setState({ error: 'Woops! Something went wrong!' })
    }
  }
  render() {
    const { email, error } = this.state
    const emailMsg = email.length
      ? `Successfully unsubscribed ${email}.`
      : null
    return (
      <div className="unsub-container">
        <p>
          {emailMsg || error}
        </p>
        <hr />
        <p>
          Click&nbsp;
          <Link href="/" to="/">here</Link>
          &nbsp;to go back to home.
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
