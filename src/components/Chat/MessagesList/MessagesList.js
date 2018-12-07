import React from 'react';
import PropTypes from 'prop-types';
import Message from '../Message/Message';
import classes from './MessagesList.css';

const MessagesList = ({ messages }) => (
  <div className={classes.div}>
  <section className={classes.list}>
    <ul className={classes.rotate}>
      {messages.map(message => (
        <Message
          key={message.id}
          {...message}
        />
    ))}
    </ul>
  </section>
  </div>
)

MessagesList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default MessagesList;
