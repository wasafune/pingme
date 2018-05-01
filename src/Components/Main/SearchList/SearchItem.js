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
      <div className={`search-item search-item${darkenClassName}`}>
        <button
          className="search-item-button"
          onClick={e => handleClick(e, index)}
        >
          <p className="search-item-info">
            <p>{title}: ch.{latest}</p>
            {completed ? <p>Status: Completed</p> : <p>&nbsp;</p>}
          </p>
        </button>
      </div>
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
