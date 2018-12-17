import * as types from '../actions/actionTypes';

const messages = (state = [], action) => {
  switch (action.type) {
    case types.ADD_MESSAGE:
    case types.MESSAGE_RECEIVED:
    console.log(action.message);
      return state.concat([
        {
          message: action.message,
          author: action.author,
          id: action.id
        }
      ])
    default:
      return state
  }
}

export default messages;
