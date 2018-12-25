import React from 'react';
import PropTypes from 'prop-types';
import classes from './Message.css';

const Message = ({ message, author }) => (
  <p className={classes.message__label}>
    <i className={classes.message__author}>{author}</i>: {message}
  </p>
)

Message.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}

export default Message;
