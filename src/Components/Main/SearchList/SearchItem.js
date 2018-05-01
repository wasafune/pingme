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
        {/* <div className="search-item-modify">
          <p className="search-item-status-msg">{state.statusMsg}</p>
          <div className="search-item-modify-dropdown">
            <p className="search-item-status">Status: </p>
            <select value={state.value} onChange={handleChange}>
              <option value="follow">follow</option>
              <option value="subscribe">subscribe</option>
            </select>
          </div>
        </div> */}
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
