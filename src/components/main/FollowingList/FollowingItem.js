import React from 'react'
import PropTypes from 'prop-types'

const FollowingItem = (props) => {
  const {
    index,
    title,
    latest,
    subscribed,
    darken,
    updated,
    handleClick,
    modified,
    parseModified,
  } = props
  const darkenClassName = darken ? 'following-item-darken' : ''
  const updatedArr = updated.split(' ')
  return (
    <div
      className={`following-item ${darkenClassName}`}
    >
      <div className="following-item-left">
        <button
          className="following-item-button"
          onClick={e => handleClick(e, index, modified)}
        >
          <p className="following-item-title">
            <span>
              {props.anime
                ? <i className="fas fa-desktop" />
                : <i className="fas fa-book" />
              }
            </span>
            {` ${title}`}
          </p>
        </button>
        {/* <p>
          {props.anime
            ? <i className="fas fa-tv" />
            : <i className="fas fa-book" />
          }
          {props.anime
            ? ' Anime'
            : ' Manga'
          }
        </p> */}
        <p>Latest: {latest}</p>
      </div>
      <div className="following-item-right">
        <p>
          Updated: {updatedArr[0]}
        </p>
        <p>
          {updatedArr.slice(1, 3).join(' ')}
        </p>
        {
          modified.length
          ? <p className="status-msg">{parseModified(modified)}</p>
          : <p>Status: {subscribed ? 'Subscribed' : 'Following'}</p>
        }
      </div>
    </div>
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
  parseModified: PropTypes.func.isRequired,
}

export default FollowingItem
