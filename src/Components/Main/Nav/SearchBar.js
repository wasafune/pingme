import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      searchStr: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleClick() {
    this.props.searchTitle(this.state.searchStr)
    this.setState({ searchStr: '' })
  }

  render() {
    const { state } = this
    const { searchStr } = state
    return (
      <div id="search-container">
        <input
          className="input-search"
          type="text"
          name="searchStr"
          value={searchStr}
          placeholder="Search here..."
          onChange={this.handleInputChange}
        />
        <button
          id="search-button"
          onClick={this.handleClick}
        >
          Search
        </button>
      </div>
    )
  }
}

SearchBar.propTypes = {
  searchTitle: PropTypes.func.isRequired,
}

export default SearchBar
