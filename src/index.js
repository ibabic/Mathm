import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import handleNewMessage from './store/sagas';
import setupSocket from './sockets';
import authReducer from './store/reducers/auth';
import rangListReducer from './store/reducers/rangList';
import gameReducer from './store/reducers/game';
import messagesReducer from './store/reducers/messages';
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;


const rootReducer = combineReducers({
    game: gameReducer,
    rang: rangListReducer,
    auth: authReducer,
    messages: messagesReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
));


export function explode(user){
    // console.log(user);
    // var arr = [];
    // for (var key in user) {
    //      arr.push(user[key]);
    // }
     let username = null;
    // if ( arr ) {
    //   username = arr.map( user => (
         username = user;
    //     ) )}
   // const username = store.getState().game.username;
    const socket = setupSocket(store.dispatch, username);
    sagaMiddleware.run(handleNewMessage, { socket, username });
  }
 


const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
