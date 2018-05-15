import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SearchItem from './SearchItem'
import ItemModal from '../ItemModal'
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
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleModal = this.handleModal.bind(this)
  }

  componentDidMount() {
    const { location, searchTitle } = this.props
    const locationArr = location.pathname.split('/').slice(-2)
    const typeStr = locationArr[0]
    const searchStr = locationArr[1].split('_').join(' ')
    searchTitle(searchStr, typeStr)
  }

  shouldComponentUpdate(nextProps) {
    const { location, searchTitle } = this.props
    if (nextProps.location.pathname !== location.pathname) {
      const locationArr = nextProps.location.pathname.split('/').slice(-2)
      const typeStr = locationArr[0]
      const searchStr = locationArr[1].split('_').join(' ')
      searchTitle(searchStr, typeStr)
      return false
    }
    return true
  }

  componentWillUnmount() {
    this.props.unmountRequestMessage()
  }

  handleSearchMore() {
    const { searchMore, search, location } = this.props
    const typeStr = location.pathname.split('/').slice(-2)[0]
    searchMore(search.searchStr, typeStr, search.searchArr.length)
  }

  handleOnKeyUp(e) {
    if (e.key !== 'Escape') return
    if (this.state.modal !== false) {
      this.setState({ modal: false, status: '' })
      this.props.unmountRequestMessage()
    }
  }

  handleClick(e, index) {
    const { state } = this
    const { searchArr } = this.props.search
    const { followingList } = this.props.user
    const { className, value } = e.target
    if (state.modal !== false) {
      if (className === 'search-modal-inner' || className === 'search-modal-detail') return
      if (value && value.length) return
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
      handleOnKeyUp,
      handleModal,
    } = this
    const { searchArr, searchEnd } = this.props.search
    const { requestMessage, _id } = this.props.user
    const locationArr = this.props.location.pathname.split('/')
    const titleStr = locationArr[2] === 'manga' ? 'Manga' : 'Anime'
    const searchStr = locationArr[3][0].toUpperCase() + locationArr[3].slice(1).split('_').join(' ')
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
        <p className="search-list-title">{titleStr} Search: {searchStr}</p>
        {
          state.modal !== false
            ? (
              <ItemModal
                _id={searchArr[state.modal]._id}
                loggedIn={_id.length > 0}
                title={searchArr[state.modal].title}
                completed={searchArr[state.modal].completed}
                followerCount={searchArr[state.modal].followerCount}
                latest={searchArr[state.modal].latest}
                genres={searchArr[state.modal].genres}
                updated={new Date(searchArr[state.modal].updated).toUTCString()}
                status={state.status}
                modified=''
                requestMessage={requestMessage}
                handleClick={handleClick}
                handleModal={handleModal}
                handleOnKeyUp={handleOnKeyUp}
              />
            )
            : null
        }
        <div className="search-item-container fade-in-element">
          {searchItemArr}
          {
            searchEnd || searchArr.length % 12 || !searchArr.length
            ? <p className="search-more">End of search.</p>
            : (
              <button
                className="search-more-button"
                name="load-more"
                onClick={handleSearchMore}
              >
                Show More
              </button>
            )
          }
        </div>
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
