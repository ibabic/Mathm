import { takeEvery } from 'redux-saga/effects';
import * as actioTypes from '../actions/actionTypes';

const handleNewMessage = function* handleNewMessage(params) {
    yield takeEvery(actioTypes.ADD_MESSAGE, (action) => {
      action.author = params.username
      params.socket.send(JSON.stringify(action))
    })
  }
  
  export default handleNewMessage;