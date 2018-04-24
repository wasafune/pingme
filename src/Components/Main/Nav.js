import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <Link href="/" to="/">
          <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-128.png" />
          PingMe
        </Link>
        <div>
          account placeholder
        </div>
      </div>
    )
  }
}

export default Nav
