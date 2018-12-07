import * as types from '../store/actions/actionTypes';
import { messageReceived } from '../store/actions';
//import store from '../index';

const setupSocket = (dispatch, username) => {
const socket = new WebSocket('ws://localhost:8989');

socket.onopen = () => {
  socket.send(JSON.stringify({
    name: username
  }))
}
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    console.log('inside socket',event.data);
    switch (data.type) {
      case types.ADD_MESSAGE:
        dispatch(messageReceived(data.message, data.author));
        break
      default:
        break
    }
  }
  return socket
}
export default setupSocket;
