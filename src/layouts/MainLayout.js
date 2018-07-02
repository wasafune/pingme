import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Nav, FollowingList, SearchList, Account, Unsub } from '../components/main'
import { loggedInCheck } from '../actions'


class MainLayout extends Component {
  componentDidMount() {
    if (!this.props.user._id.length) {
      this.props.loggedInCheck()
    }
  }

  render() {
    return (
      <div className="main-layout">
        <Nav />
        <Switch>
          <Route exact path="/" component={FollowingList} />
          <Route exact path="/account" component={Account} />
          <Route path="/unsub" component={Unsub} />
          <Route path="/search" component={SearchList} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loggedInCheck,
  },
  dispatch,
)

MainLayout.propTypes = {
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  loggedInCheck: PropTypes.func.isRequired,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainLayout)
