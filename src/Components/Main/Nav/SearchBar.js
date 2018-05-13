import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      searchStr: '',
      submit: '',
      manga: true,
      anime: false,
    }
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // reset submit after search
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.submit === this.state.submit && this.state.submit.length) {
      this.setState({ submit: '' })
      return false
    }
    return true
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
    const {
      searchStr, manga, anime, submit,
    } = state
    const typeStr = manga ? 'manga' : 'anime'
    const urlQuery = `/search/${typeStr}/${state.submit}`
    return (
      <div className="search-container">
        {submit.length ? <Redirect to={urlQuery} /> : null}
        <form onSubmit={handleSubmit}>
          <div className="search-text-container">
            <input
              className="input-search"
              type="text"
              name="searchStr"
              value={searchStr}
              placeholder={`Search ${manga ? 'mangas' : 'animes'}...`}
              onChange={handleInputChange}
            />
            <button id="search-button" type="submit">
              <i className="fas fa-search" />
            </button>
          </div>
          <div className="search-checkbox-container">
            <label className="search-label-text">
              <input
                name="manga"
                type="checkbox"
                checked={manga}
                onChange={handleCheckboxChange}
              />
              Manga
            </label>
            <label className="search-label-text">
              <input
                name="anime"
                type="checkbox"
                checked={anime}
                onChange={handleCheckboxChange}
              />
              Anime
            </label>
          </div>

        </form>
      </div>
    )
  }
}


export default SearchBar
