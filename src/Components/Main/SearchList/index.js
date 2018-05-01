import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SearchItem from './SearchItem'
import SearchModal from './SearchModal'
import {
  searchTitle, searchMore,
  follow, subscribe,
  unfollow, unsubscribe,
  unmountRequestMessage,
} from '../../../actions'


class SearchList extends Component {
  constructor() {
    super()
    this.state = {
      modal: false,
      status: false,
    }
    this.handleSearchMore = this.handleSearchMore.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleModal = this.handleModal.bind(this)
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

  handleSearchMore() {
    const { searchMore, search } = this.props
    searchMore(search.searchStr, search.searchArr.length)
  }

  handleClick(e, index) {
    const { state } = this
    const { searchArr } = this.props.search
    const { followingList } = this.props.user
    if (state.modal !== false) {
      this.setState({ modal: false, status: '' })
      this.props.unmountRequestMessage()
    }
    if (state.modal === false) {
      const status = followingList.reduce((acc, ele) => {
        if (ele._id === searchArr[index]._id) {
          if (ele.subscribed) return 'subscribing'
          return 'following'
        }
        return acc
      }, false)
      this.setState({ modal: index, status })
    }
  }

  handleModal(e, mangaId) {
    const {
      user, follow, subscribe,
      unsubscribe, unfollow,
    } = this.props
    const { value } = e.target
    // add logic for not logged in
    if (!user._id.length) return
    if (value === 'follow') follow(user._id, mangaId, false)
    if (value === 'followSubscribe') follow(user._id, mangaId, true)
    if (value === 'subscribe') subscribe(user._id, mangaId)
    if (value === 'unsubscribe') unsubscribe(user._id, mangaId)
    if (value === 'unfollow') unfollow(user._id, mangaId)
  }

  render() {
    const {
      state,
      handleClick,
      handleSearchMore,
      handleModal,
    } = this
    const { searchArr, searchEnd } = this.props.search
    const { requestMessage } = this.props.user
    const searchItemArr = searchArr.map((ele, i) => {
      return (
        <SearchItem
          key={ele._id}
          _id={ele._id}
          index={i}
          title={ele.title}
          completed={ele.completed}
          followerCount={ele.followerCount}
          latest={ele.latest}
          darken={(i % 2) !== 0}
          handleClick={handleClick}
        />
      )
    })
    return (
      <div className="search-list">
        <h2>Search List</h2>
        {
          state.modal !== false
            ? (
              <SearchModal
                _id={searchArr[state.modal]._id}
                title={searchArr[state.modal].title}
                completed={searchArr[state.modal].completed}
                followerCount={searchArr[state.modal].followerCount}
                latest={searchArr[state.modal].latest}
                status={state.status}
                requestMessage={requestMessage}
                handleClick={handleClick}
                handleModal={handleModal}
              />
            )
            : null
        }
        {searchItemArr}
        {
          searchEnd
            ? <p>End of search</p>
            : (
              <button name="load-more" onClick={handleSearchMore}>
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
  user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    searchTitle,
    searchMore,
    follow,
    subscribe,
    unsubscribe,
    unfollow,
    unmountRequestMessage,
  },
  dispatch,
)

SearchList.propTypes = {
  user: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  searchTitle: PropTypes.func.isRequired,
  searchMore: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  unmountRequestMessage: PropTypes.func.isRequired,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchList)
