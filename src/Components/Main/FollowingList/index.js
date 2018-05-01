import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import FollowingItem from './FollowingItem'
import { retrieveMangas, unmountRequestMessage } from '../../../actions'


class FollowingList extends Component {
  componentDidMount() {
    const { retrieveMangas, user } = this.props
    const { followingList } = user
    retrieveMangas(followingList)
  }

  componentWillUnmount() {
    this.props.unmountRequestMessage()
  }

  render() {
    const { requestMessage, retrievedList, _id } = this.props.user
    if (!_id.length) {
      return (
        <div className="following-list">
          Login to see your list!
          <Link href="/auth/login" to="/auth/login">Login</Link>
          <Link href="/auth/signin" to="/auth/signin">Signup</Link>
        </div>
      )
    }
    // retrievedList.sort((a, b) => )
    const FollowingItemArr = retrievedList.map((ele, i) => {
      return (
        <FollowingItem
          key={ele._id}
          _id={ele._id}
          index={i}
          title={ele.title}
          updated={ele.updated}
          followerCount={ele.followerCount}
          latest={ele.latest}
          darken={(i % 2) !== 0}
          // handleClick={handleClick}
        />
      )
    })
    return (
      <div className="following-list">
        <h2>Following</h2>
        {requestMessage ? <p>List retrieval failed...</p> : null}
        {!retrievedList.length ? <p>Follow/Subscribe to some titles!</p> : null}
        {FollowingItemArr}
      </div>
    )
  }
}

FollowingList.propTypes = {
  user: PropTypes.object.isRequired,
  retrieveMangas: PropTypes.func.isRequired,
  unmountRequestMessage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    retrieveMangas,
    unmountRequestMessage,
  },
  dispatch,
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FollowingList)
