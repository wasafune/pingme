import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'


import SearchBar from './SearchBar'

class Nav extends Component {
  render() {
    const { user } = this.props
    const linkRoute = user.displayName.length ? '/account' : '/auth/login'
    const linkText = user.displayName.length ? 'Account' : 'Login'
    return (
      <div className="nav fade-in-element">
        <div className="nav-left">
          <Link className="nav-left-link" href="/" to="/">
            <img className="nav-logo" src="/media/logo-shrunk.svg" />
            <h1>Ping<span>Me</span></h1>
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
