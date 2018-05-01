import React from 'react'
import PropTypes from 'prop-types'


const SearchModal = (props) => {
  const { handleModal, requestMessage } = props
  const [button1Val, button1Text, button2Val, button2Text] = props.status
    ? props.status === 'following'
      ? ['subscribe', 'Subscribe', 'unfollow', 'Unfollow']
      : ['unsubscribe', 'Unsubscribe', 'unfollow', 'Unfollow']
    : ['follow', 'Follow', 'followSubscribe', 'Subscribe']
  return (
    <div className="search-modal-background">
      <div className="search-modal-inner">
        {props.title}
        <button
          value={button1Val}
          onClick={(e) => handleModal(e, props._id)}
        >
          {button1Text}
        </button>
        <button
          value={button2Val}
          onClick={(e) => handleModal(e, props._id)}
        >
          {button2Text}
        </button>
        {requestMessage ? <p>{requestMessage}</p> : <p>&nbsp;</p>}
      </div>
    </div>
  )
}

SearchModal.propTypes = {
  title: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
  requestMessage: PropTypes.string.isRequired,
}

export default SearchModal
