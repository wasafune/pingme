import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'


import SearchBar from './SearchBar'

class Nav extends Component {
  render() {
    const { user } = this.props
    const linkRoute = user.displayName.length ? '/account' : '/auth/login'
    const linkText = user.displayName.length ? user.displayName : 'Login'
    return (
      <div className="nav">
        <div className="nav-left">
          <Link href="/" to="/">
            PingMe
          </Link>
        </div>
        <div className="nav-right">
          <SearchBar />
          <Link href={linkRoute} to={linkRoute}>
            {linkText}
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

Nav.propTypes = {
  user: PropTypes.object.isRequired,
}


export default connect(mapStateToProps)(Nav)
