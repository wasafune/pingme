import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SearchItem from './SearchItem'
import { searchTitle, searchMore } from '../../../actions'


class SearchList extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const { location, searchTitle } = this.props
    const searchStr = location.pathname.split('/').slice(-1)[0].split('_').join(' ')
    searchTitle(searchStr)
  }

  shouldComponentUpdate(nextProps) {
    const { location, searchTitle } = this.props
    if (nextProps.location.pathname !== location.pathname) {
      const searchStr = nextProps.location.pathname.split('/').slice(-1)[0].split('_').join(' ')
      searchTitle(searchStr)
      return false
    }
    return true
  }

  handleClick() {
    const { searchMore, search } = this.props
    searchMore(search.searchStr, search.searchArr.length)
  }

  render() {
    const { searchArr, searchEnd } = this.props.search
    const searchItemArr = searchArr.map((ele, i) => {
      return (
        <SearchItem
          key={ele._id}
          title={ele.title}
          latest={ele.latest}
          darken={(i % 2) !== 0}
        />
      )
    })
    return (
      <div className="search-list">
        <h2>Search List</h2>
        {searchItemArr}
        {
          searchEnd
            ? <p>End of search</p>
            : (
              <button name="load-more" onClick={this.handleClick}>
                Show More
              </button>
            )
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  search: state.search,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    searchTitle,
    searchMore,
  },
  dispatch,
)

SearchList.propTypes = {
  search: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  searchTitle: PropTypes.func.isRequired,
  searchMore: PropTypes.func.isRequired,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchList)
