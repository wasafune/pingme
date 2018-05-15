import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


class ItemModal extends Component {
  constructor() {
    super()
    this.state = {
      clicked: false,
    }
    this.localClick = this.localClick.bind(this)
  }

  localClick() {
    this.setState({ clicked: true })
  }

  render() {
    const {
      handleModal,
      handleClick,
      handleOnKeyUp,
      requestMessage,
      index,
    } = this.props
    const [button1Val, button1Text, button2Val, button2Text] = this.props.status
      ? this.props.status === 'following'
        ? ['subscribe', 'Subscribe', 'unfollow', 'Unfollow']
        : ['unsubscribe', 'Unsubscribe', 'unfollow', 'Unfollow']
      : ['follow', 'Follow', 'followSubscribe', 'Subscribe']
    const genres = this.props.genres.map(str => str[0].toUpperCase() + str.slice(1))

    // if series completed render skeleton component
    if (this.props.completed) {
      return (
        <div
          className="search-modal-background"
          tabIndex="0"
          onClick={handleClick}
          onKeyUp={handleOnKeyUp}
        >
          <div className="search-modal-inner">
            <div className="search-modal-header">
              <h2>{this.props.title}</h2>
              <button onClick={handleClick}>X</button>
            </div>
            <div className="search-modal-detail-container">
              <p>Genres: {genres.join(', ')}</p>
              <p>Status: This series is no longer ongoing.</p>
            </div>
            <p className="search-modal-request-msg" />
            <div className="search-modal-inner-buttons" />
          </div>
        </div>
      )
    }
    return (
      <div
        className="search-modal-background"
        tabIndex="0"
        onClick={handleClick}
        onKeyUp={handleOnKeyUp}
      >
        <div className="search-modal-inner">
          <div className="search-modal-header">
            <h2>{this.props.title}</h2>
            <button name="close" onClick={handleClick}>X</button>
          </div>
          <div className="search-modal-detail-container">
            <p>Latest : {this.props.latest}</p>
            {genres.length ? <p>Genres : {genres.join(', ')}</p> : null}
            <p>Follower Count : {this.props.followerCount}</p>
            <p>Updated : {this.props.updated.split(' ').slice(0, 3).join(' ')}</p>
            {this.props.subscribed === undefined
              ? null
              : <p>Status : {this.props.subscribed ? 'Subscribed' : 'Following'}</p>
            }
          </div>
          <p className="search-modal-request-msg">
            {requestMessage || ''}&nbsp;
          </p>
          {
            !this.props.modified.length && this.props.loggedIn
            ? (
              <div className="search-modal-inner-buttons">
                <button
                  value={button1Val}
                  onClick={(e) => {
                    if (!this.state.clicked) {
                      this.localClick()
                      handleModal(e, this.props._id, index)
                    }
                  }}
                >
                  {button1Text}
                </button>
                <button
                  value={button2Val}
                  onClick={(e) => {
                    if (!this.state.clicked) {
                      this.localClick()
                      handleModal(e, this.props._id, index)
                    }
                  }}
                >
                  {button2Text}
                </button>
              </div>
            )
            : (
              <div className="search-modal-inner-buttons">
                {
                  this.props.loggedIn
                    ? (
                      <p>
                        {this.props.modified.toUpperCase()} successful! <a href="/">Refresh</a> to update.
                      </p>
                    )
                    : <p><Link href="/auth/login" to="/auth/login">Login</Link> to subscribe/follow!</p>
                }
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

ItemModal.propTypes = {
  title: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  latest: PropTypes.number.isRequired,
  genres: PropTypes.array.isRequired,
  updated: PropTypes.string.isRequired,
  subscribed: PropTypes.bool.isRequired,
  status: PropTypes.bool.isRequired,
  modified: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleOnKeyUp: PropTypes.func.isRequired,
  requestMessage: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
}

export default ItemModal
