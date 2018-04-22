import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../actions'

const mapStateToProps = state => ({
  user: state.users,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    reqUserInfo: actions.reqUserInfo,
  },
  dispatch,
)


class Tester extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    this.props.reqUserInfo({
      userName: 'peter',
      password: 'pass',
      age: 21,
    })
  }

  render() {
    return (
      <div>
        TESTER!!!
        {JSON.stringify(this.props.user)}
      </div>
    )
  }
}

Tester.propTypes = {
  user: PropTypes.arrayOf(PropTypes.object).isRequired,
  reqUserInfo: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Tester)
