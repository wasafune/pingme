import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SearchItem extends Component {
  render() {
    const {
      index,
      title,
      latest,
      darken,
      completed,
      handleClick,
    } = this.props
    const darkenClassName = darken ? '-darken' : ''
    return (
      <button
        className={`search-item search-item${darkenClassName}`}
        onClick={e => handleClick(e, index)}
      >
        <div className="search-item-left">
          <p className="search-item-title">{title}</p>
          <p>Latest: {latest}</p>
        </div>
        <div className="search-item-right">
          {completed ? <p>Status: Completed</p> : <p>&nbsp;</p>}
        </div>
      </button>
    )
  }
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
