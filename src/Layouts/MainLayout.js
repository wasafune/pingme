import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import { Nav, FollowingList, SearchList } from '../components/main'

class MainLayout extends Component {
  render() {
    return (
      <div className="main-layout">
        <Nav />
        <h1>MainLayout</h1>
        <Link href="/" to="/">home</Link>
        <Link href="/search" to="/search">search</Link>
        <Switch>
          <Route exact path="/" component={FollowingList} />
          <Route path="/search" component={SearchList} />
        </Switch>
      </div>
    )
  }
}


export default MainLayout
