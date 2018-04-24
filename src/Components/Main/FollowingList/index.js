import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const mapStateToProps = state => ({
  user: state.users,
})

class FollowingList extends Component {
  render() {
    return (
      <div className="following-list">
        <h2>Following</h2>
      </div>
    )
  }
}

FollowingList.propTypes = {
  // user: PropTypes.object.isRequired,
}


export default connect(mapStateToProps)(FollowingList)
