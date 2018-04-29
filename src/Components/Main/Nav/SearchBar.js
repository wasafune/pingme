import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      searchStr: '',
      submit: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.searchStr.length) {
      const parsedSearchStr = this.state.searchStr.split(' ').join('_')
      this.setState({ submit: parsedSearchStr, searchStr: '' })
    }
  }

  render() {
    const { state } = this
    const { searchStr } = state
    const urlQuery = `/search/${state.submit}`
    return (
      <div className="search-container">
        {state.submit.length ? <Redirect to={urlQuery} /> : null}
        <form onSubmit={this.handleSubmit}>
          <input
            className="input-search"
            type="text"
            name="searchStr"
            value={searchStr}
            placeholder="Search here..."
            onChange={this.handleInputChange}
          />
          <button id="search-button" type="submit">Search</button>
        </form>
      </div>
    )
  }
}


export default SearchBar
