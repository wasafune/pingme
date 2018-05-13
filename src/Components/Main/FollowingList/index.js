import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cloneDeep from 'lodash/cloneDeep'

import FollowingItem from './FollowingItem'
import LoginReroute from './LoginReroute'
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
      display: false,
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
    setTimeout(() => {
      this.setState({ display: true })
    }, 42)
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
    this.setState({ show: name, display: false })
    setTimeout(() => {
      this.setState({ display: true })
    }, 42)
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
    // take login/signup reroute page if not logged in
    if (!_id.length) {
      return <LoginReroute />
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
          handleClick={handleClick}
        />
      )
    })
    // filter list based on state.show
    const FollowingItemArrFiltered = FollowingItemArr.filter((ele) => {
      if (state.show === 'all') return true
      if (state.show === 'manga' && !ele.props.anime) return true
      if (state.show === 'anime' && ele.props.anime) return true
      return false
    })
    // final iteration for darken prop
    const FollowingItemArrMapped = FollowingItemArrFiltered.map((ele, i) => {
      const temp = { ...ele }
      const tempProps = { ...ele.props }
      temp.props = tempProps
      tempProps.darken = (i % 2) !== 0
      return temp
    })
    return (
      <div className="following-list">
        <div className="following-list-buttons-container">
          <button
            className={`following-list-button${
              state.show === 'all'
                ? ' following-list-button-active'
                : ''
              }`
            }
            name='all'
            onClick={handleShowClick}
          >
            YOUR LIST
          </button>
          <button
            className={`following-list-button${
              state.show === 'manga'
                ? ' following-list-button-active'
                : ''
              }`
            }
            name='manga'
            onClick={handleShowClick}
          >
            MANGA
          </button>
          <button
            className={`following-list-button${
              state.show === 'anime'
                ? ' following-list-button-active'
                : ''
              }`
            }
            name='anime'
            onClick={handleShowClick}
          >
            ANIME
          </button>
        </div>
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
        <div className="following-item-container">
          <div
            className={`following-item-fade ${state.display ? 'fade-in-element' : 'hidden'}`}
          >
            {/* {requestMessage ? <p>List retrieval failed...</p> : null} */}
            {!retrievedList.length
              ? <p>Follow/Subscribe to some titles!</p>
              : FollowingItemArrMapped}
          </div>
        </div>
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
