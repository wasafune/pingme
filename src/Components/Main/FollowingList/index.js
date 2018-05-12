import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cloneDeep from 'lodash/cloneDeep'

import FollowingItem from './FollowingItem'
import ItemModal from '../ItemModal'
import {
  retrieveMangas, unmountRequestMessage,
  subscribe, unfollow, unsubscribe,
} from '../../../actions'


class FollowingList extends Component {
  constructor() {
    super()
    this.state = {
      modal: false,
      status: false,
      modified: '',
      modifiedIndices: {},
      show: 'all',
    }
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleModal = this.handleModal.bind(this)
    this.handleShowClick = this.handleShowClick.bind(this)
  }

  componentDidMount() {
    const { retrieveMangas, user } = this.props
    const { followingList } = user
    if (this.props.user.loggedInCheck && user._id.length) {
      retrieveMangas(followingList)
    }
  }

  shouldComponentUpdate(nextProps) {
    const { retrievedList } = this.props.user
    if (nextProps.user.requestingUser) return false
    if (nextProps.user.followingList.length && !retrievedList.length) {
      this.props.retrieveMangas(nextProps.user.followingList)
      return false
    }
    return true
  }

  componentWillUnmount() {
    this.props.unmountRequestMessage()
  }

  handleOnKeyUp(e) {
    if (e.key !== 'Escape') return
    if (this.state.modal !== false) {
      this.setState({ modal: false, status: '' })
      this.props.unmountRequestMessage()
    }
  }

  handleClick(e, index, modified) {
    const { state } = this
    const { retrievedList } = this.props.user
    const { className, value } = e.target
    if (state.modal !== false) {
      if (className === 'search-modal-inner' || className === 'search-modal-detail') return
      if (value && value.length) return
      this.setState({ modal: false, status: '' })
      this.props.unmountRequestMessage()
    }
    if (state.modal === false) {
      const status = retrievedList[index].subscribed ? 'subscribed' : 'following'
      this.setState({ modal: index, status, modified })
    }
  }

  handleShowClick(e) {
    const { name } = e.target
    this.setState({ show: name })
  }

  handleModal(e, mangaId, index) {
    const {
      user, subscribe,
      unsubscribe, unfollow,
    } = this.props
    const { value } = e.target
    // add logic for not logged in
    if (!user._id.length) return
    if (value === 'subscribe') subscribe(user._id, mangaId, false)
    if (value === 'unsubscribe') unsubscribe(user._id, mangaId, true)
    if (value === 'unfollow') unfollow(user._id, mangaId)
    const modifiedIndices = cloneDeep(this.state.modifiedIndices)
    modifiedIndices[index] = value
    this.setState({ modifiedIndices })
  }


  render() {
    const {
      state,
      handleClick,
      handleModal,
      handleOnKeyUp,
      handleShowClick,
    } = this
    const { requestMessage, retrievedList, _id } = this.props.user
    // not logged in (move to separate component)
    if (!_id.length) {
      return (
        <div className="following-list">
          Login to see your list!
          <Link href="/auth/login" to="/auth/login">Login</Link>
          <Link href="/auth/signup" to="/auth/signup">Signup</Link>
        </div>
      )
    }
    const FollowingItemArr = retrievedList.map((ele, i) => {
      return (
        <FollowingItem
          key={ele._id}
          _id={ele._id}
          index={i}
          modified={state.modifiedIndices[i] || ''}
          title={ele.title}
          anime={ele.anime}
          updated={ele.updated.toUTCString()}
          subscribed={ele.subscribed}
          followerCount={ele.followerCount}
          latest={ele.latest}
          darken={(i % 2) !== 0}
          handleClick={handleClick}
        />
      )
    })
    const FollowingItemArrFiltered = FollowingItemArr.filter((ele) => {
      if (state.show === 'all') return true
      if (state.show === 'manga' && !ele.props.anime) return true
      if (state.show === 'anime' && ele.props.anime) return true
      return false
    })
    return (
      <div className="following-list">
        <h2>Following</h2>
        <button name='all' onClick={handleShowClick}>
          All
        </button>
        <button name='manga' onClick={handleShowClick}>
          Manga
        </button>
        <button name='anime' onClick={handleShowClick}>
          Anime
        </button>
        {
          state.modal !== false
            ? (
              <ItemModal
                _id={retrievedList[state.modal]._id}
                title={retrievedList[state.modal].title}
                index={state.modal}
                followerCount={retrievedList[state.modal].followerCount}
                latest={retrievedList[state.modal].latest}
                genres={retrievedList[state.modal].genres}
                updated={retrievedList[state.modal].updated.toUTCString()}
                subscribed={retrievedList[state.modal].subscribed}
                status={state.status}
                modified={state.modified}
                requestMessage={requestMessage}
                handleClick={handleClick}
                handleModal={handleModal}
                handleOnKeyUp={handleOnKeyUp}
              />
            )
            : null
        }

        {requestMessage ? <p>List retrieval failed...</p> : null}
        {!retrievedList.length ? <p>Follow/Subscribe to some titles!</p> : null}
        {FollowingItemArrFiltered}
      </div>
    )
  }
}

FollowingList.propTypes = {
  user: PropTypes.object.isRequired,
  retrieveMangas: PropTypes.func.isRequired,
  unmountRequestMessage: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    retrieveMangas,
    unmountRequestMessage,
    subscribe,
    unsubscribe,
    unfollow,
  },
  dispatch,
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FollowingList)
