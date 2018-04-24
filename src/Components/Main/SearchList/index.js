import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SearchItem from './SearchItem'

const mapStateToProps = state => ({
  search: state.search,
})


class SearchList extends Component {
  render() {
    const { searchArr } = this.props.search
    const searchItemArr = searchArr.map((ele) => {
      return (
        <SearchItem
          title={ele.title}
        />
      )
    })
    return (
      <div className="search-list">
        <h2>Search List</h2>
        {searchItemArr}
      </div>
    )
  }
}

SearchList.propTypes = {
  search: PropTypes.object.isRequired,
}


export default connect(mapStateToProps)(SearchList)
