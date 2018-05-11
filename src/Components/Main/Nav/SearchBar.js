import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      searchType: 'manga',
      searchStr: '',
      submit: '',
      manga: true,
      anime: false,
    }
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCheckboxChange(event) {
    const { state } = this
    const { name } = event.target
    if (state[name]) return
    const other = name === 'manga' ? 'anime' : 'manga'
    this.setState({ [name]: true, [other]: false })
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value, submit: '' })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.searchStr.length) {
      const parsedSearchStr = this.state.searchStr.split(' ').join('_')
      this.setState({ submit: parsedSearchStr, searchStr: '' })
    }
  }

  render() {
    const {
      state,
      handleSubmit,
      handleInputChange,
      handleCheckboxChange,
    } = this
    const { searchStr, manga, anime } = state
    const typeStr = manga ? 'manga' : 'anime'
    const urlQuery = `/search/${typeStr}/${state.submit}`
    return (
      <div className="search-container">
        {state.submit.length ? <Redirect to={urlQuery} /> : null}
        <form onSubmit={handleSubmit}>
          <label>
            Manga
            <input
              name="manga"
              type="checkbox"
              checked={manga}
              onChange={handleCheckboxChange}
            />
          </label>
          <label>
            Anime
            <input
              name="anime"
              type="checkbox"
              checked={anime}
              onChange={handleCheckboxChange}
            />
          </label>
          <input
            className="input-search"
            type="text"
            name="searchStr"
            value={searchStr}
            placeholder="Search here..."
            onChange={handleInputChange}
          />
          <button id="search-button" type="submit">Search</button>
        </form>
      </div>
    )
  }
}


export default SearchBar
