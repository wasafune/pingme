import React from 'react'
import PropTypes from 'prop-types'


const ItemModal = (props) => {
  const {
    handleModal,
    handleClick,
    handleOnKeyUp,
    requestMessage,
    index,
  } = props
  const [button1Val, button1Text, button2Val, button2Text] = props.status
    ? props.status === 'following'
      ? ['subscribe', 'Subscribe', 'unfollow', 'Unfollow']
      : ['unsubscribe', 'Unsubscribe', 'unfollow', 'Unfollow']
    : ['follow', 'Follow', 'followSubscribe', 'Subscribe']
  const genres = props.genres.map(str => str[0].toUpperCase() + str.slice(1))
  if (props.completed) {
    return (
      <div
        className="search-modal-background"
        tabIndex="0"
        onClick={handleClick}
        onKeyUp={handleOnKeyUp}
      >
        <div className="search-modal-inner">
          <div className="search-modal-header">
            <h2>{props.title}</h2>
            <button onClick={handleClick}>X</button>
          </div>
          <div className="search-modal-detail-container">
            <p>Genres: {genres.join(', ')}</p>
            <p>Status: This series is no longer ongoing.</p>
          </div>
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
          <h2>{props.title}</h2>
          <button onClick={handleClick}>X</button>
        </div>
        <div className="search-modal-detail-container">
          <p>Latest : {props.latest}</p>
          <p>Genres : {genres.join(', ')}</p>
          <p>Follower Count : {props.followerCount}</p>
          <p>Updated : {props.updated.split(' ').slice(0, 3).join(' ')}</p>
          {props.subscribed === undefined
            ? null
            : <p>Status : {props.subscribed ? 'Subscribed' : 'Following'}</p>
          }
        </div>
        {
          !props.modified.length
          ? (
            <div className="search-modal-inner-buttons">
              <button
                value={button1Val}
                onClick={(e) => handleModal(e, props._id, index)}
              >
                {button1Text}
              </button>
              <button
                value={button2Val}
                onClick={(e) => handleModal(e, props._id, index)}
              >
                {button2Text}
              </button>
            </div>
          )
          : (
            <div className="search-modal-inner-buttons">
              <p>{props.modified.toUpperCase()} successful!</p>
              <p>
                <a href="/">Refresh</a> to update.
              </p>
            </div>
          )
        }
        <p className="search-modal-request-msg">
          {requestMessage || ''}&nbsp;
        </p>
      </div>
    </div>
  )
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
}

export default ItemModal
