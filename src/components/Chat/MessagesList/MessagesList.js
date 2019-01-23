import React from 'react';
import PropTypes from 'prop-types';
import Message from '../Message/Message';
import classes from './MessagesList.css';

const MessagesList = ({ messages }) => (
  <div>
    <p className={classes.chat__title}>
      Game Chat <i className="fa fa-comments" aria-hidden="true"></i>
    </p>
    
    <div className={classes.messageList__wrapper}>
  
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
