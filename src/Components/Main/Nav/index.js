import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { searchTitle } from '../../../actions'
import SearchBar from './SearchBar'

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <Link href="/" to="/">
          <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-128.png" />
          PingMe
        </Link>
        <div>
          <SearchBar searchTitle={this.props.searchTitle} />
          account
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  search: state.search,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    searchTitle,
  },
  dispatch,
)

Nav.propTypes = {
  searchTitle: PropTypes.func.isRequired,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nav)
