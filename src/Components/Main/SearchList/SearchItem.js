import React from 'react'
import PropTypes from 'prop-types'

const SearchItem = (props) => {
  return (
    <div className="search-item">
      {props.title}
    </div>
  )
}

SearchItem.propTypes = {
  title: PropTypes.string.isRequired,
}

export default SearchItem
