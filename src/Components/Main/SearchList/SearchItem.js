import React from 'react'
import PropTypes from 'prop-types'

const SearchItem = (props) => {
  const {
    index,
    title,
    latest,
    darken,
    completed,
    handleClick,
  } = props
  const darkenClassName = darken ? 'search-item-darken' : 'search-item'
  return (
    <div className={`${darkenClassName} fade-in-element`}>
      <div className="search-item-left">
        <button
          className="search-item-button"
          onClick={e => handleClick(e, index)}
        >
          <p className="search-item-title">{title}</p>
        </button>
        <p>Latest: {latest}</p>
      </div>
      <div className="search-item-right">
        {completed ? <p>Status: Completed</p> : <p>&nbsp;</p>}
      </div>
    </div>
  )
}

SearchItem.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  latest: PropTypes.number.isRequired,
  completed: PropTypes.string.isRequired,
  darken: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default SearchItem
