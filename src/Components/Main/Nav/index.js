import React from 'react'
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar'

const Nav = () => {
  return (
    <div className="nav">
      <div className="nav-left">
        <Link href="/" to="/">
          PingMe
        </Link>
      </div>
      <div className="nav-right">
        <SearchBar />
        account
      </div>
    </div>
  )
}

export default Nav
