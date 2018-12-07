import { connect } from 'react-redux';
import MessagesListComponent from '../../../components/Chat/MessagesList/MessagesList';

export const MessagesList = connect(state => ({
  messages: state.messages
}), {})(MessagesListComponent)
