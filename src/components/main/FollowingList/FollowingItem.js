import React from 'react'
import PropTypes from 'prop-types'

const FollowingItem = (props) => {
  return (
    <div>
      {props.title}
    </div>
  )
}


FollowingItem.propTypes = {
  title: PropTypes.string.isRequired,
}

export default FollowingItem
