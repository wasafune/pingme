import React from 'react'
import PropTypes from 'prop-types'

const FollowingItem = (props) => {
  const {
    index,
    title,
    latest,
    subscribed,
    darken,
    handleClick,
    modified,
  } = props
  const darkenClassName = darken ? '-darken' : ''
  return (
    <button
      className={`following-item following-item${darkenClassName}`}
      onClick={e => handleClick(e, index, modified)}
    >
      <div className="following-item-left">
        <p className="following-item-title">{title}</p>
        <p>Latest: {latest}</p>
        <p>Type: {props.anime ? 'Anime' : 'Manga'}</p>
      </div>
      <div className="following-item-right">
        <p>
          Updated: {props.updated.split(' ').slice(0, 3).join(' ')}
        </p>
        {
          modified.length
          ? <p className="status-msg">{modified.toUpperCase()} successful!</p>
          : <p>Status: {subscribed ? 'Subscribed' : 'Following'}</p>
        }
      </div>
    </button>
  )
}


FollowingItem.propTypes = {
  title: PropTypes.string.isRequired,
  anime: PropTypes.bool.isRequired,
  modified: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  latest: PropTypes.number.isRequired,
  darken: PropTypes.bool.isRequired,
  updated: PropTypes.string.isRequired,
  subscribed: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default FollowingItem
