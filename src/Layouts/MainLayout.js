import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../actions'
import Search from '../Components/Main/Search'
import Nav from '../Components/Main/Nav'
import FollowingList from '../Components/Main/FollowingList'

const mapStateToProps = state => ({
  user: state.users,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    reqUserInfo: actions.reqUserInfo,
  },
  dispatch,
)


class MainLayout extends Component {
  render() {
    console.log(this.props.user);
    return (
      <div>
        <Nav />
        <Search />
        <h1>MainLayout</h1>
        <FollowingList />
      </div>
    )
  }
}

MainLayout.propTypes = {
  user: PropTypes.object.isRequired,
  // reqUserInfo: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)
