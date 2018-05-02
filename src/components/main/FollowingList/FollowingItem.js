import React from 'react'
import PropTypes from 'prop-types'

const FollowingItem = (props) => {
  const {
    index,
    title,
    latest,
    darken,
    handleClick,
  } = props
  return (
    <div>
      <button
        className="following-item-button"
        onClick={e => handleClick(e, index)}
      >
        <p className="following-item-info">
          <p>{title}: ch.{latest}</p>
          {props.modified}
        </p>
      </button>
      {props.updated}
      {props.subscribed}
    </div>
  )
}


FollowingItem.propTypes = {
  title: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  latest: PropTypes.number.isRequired,
  darken: PropTypes.bool.isRequired,
  updated: PropTypes.string.isRequired,
  subscribed: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default FollowingItem
