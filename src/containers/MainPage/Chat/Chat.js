import React from 'react';
import { MessagesList } from './MessagesList';
import { AddMessage } from './AddMessage';
import classes from './Chat.css';

const Chat = () => (
  <div className={classes.chatWrapper}>
    <section className={classes}>
      <MessagesList />
      <AddMessage />
    </section>
  </div>
)


export default Chat;