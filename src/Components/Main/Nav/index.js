import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'


import SearchBar from './SearchBar'

class Nav extends Component {
  render() {
    const { user } = this.props
    const linkRoute = user.displayName.length ? '/auth/logout' : '/auth/login'
    const linkText = user.displayName.length ? 'Logout' : 'Login'
    return (
      <div className="nav">
        <div className="nav-left">
          <Link className="nav-left-link" href="/" to="/">
            <img className="nav-logo" src="/media/logo.svg" />
            <h1>Ping<span className="nav-title">Me</span></h1>
          </Link>
        </div>
        <div className="nav-right">
          <SearchBar />
          <Link className="nav-acct-link" href={linkRoute} to={linkRoute}>
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
