import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SearchItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statusMsg: '',
      value: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const { value } = e
    this.setState({ value })
  }

  render() {
    const { props, state, handleChange } = this
    const darken = props.darken ? '-darken' : ''
    return (
      <div className={`search-item search-item${darken}`}>
        <p className="search-item-info">
          {props.title}: ch.{props.latest}
        </p>
        <div className="search-item-modify">
          <p className="search-item-status-msg">{state.statusMsg}</p>
          <div className="search-item-modify-dropdown">
            <p className="search-item-status">Status: </p>
            <select value={state.value} onChange={handleChange}>
              <option value="follow">follow</option>
              <option value="subscribe">subscribe</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}

SearchItem.propTypes = {
  title: PropTypes.string.isRequired,
}

export default SearchItem
