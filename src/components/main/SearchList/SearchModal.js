import React from 'react'
import PropTypes from 'prop-types'


const SearchModal = (props) => {
  const {
    handleModal,
    handleClick,
    requestMessage,
    index,
  } = props
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
          onClick={(e) => handleModal(e, props._id, index)}
        >
          {button1Text}
        </button>
        <button
          value={button2Val}
          onClick={(e) => handleModal(e, props._id, index)}
        >
          {button2Text}
        </button>
        <button onClick={handleClick}>X Close</button>
        {requestMessage ? <p>{requestMessage}</p> : <p>&nbsp;</p>}
      </div>
    </div>
  )
}

SearchModal.propTypes = {
  title: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  status: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  requestMessage: PropTypes.string.isRequired,
}

export default SearchModal
