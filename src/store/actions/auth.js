import axios from 'axios';
import * as actionTypes from './actionTypes';
import { explode } from '../../index';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const modalOff = (modal) => {
    return {
        type: actionTypes.MODAL_OFF,
        modal: modal
    };
};

export const authSuccess = (token, userId) => {
  return {
      type: actionTypes.AUTH_SUCCESS,
      idToken: token,
      userId: userId
  };
};

export const userData = (user) => {
    return {
        type: actionTypes.USER_DATA,
        user: user
    };
  };

  export const toggle = () => {
    return {
        type: actionTypes.HAM_TOG
    };
  };  


export const authFail = (error) => {
  return {
      type: actionTypes.AUTH_FAIL,
      error: error
  };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const auth = (email, password, level, username) => {
  return dispatch => {
      dispatch(authStart());
      const authData = {
        email: email,
        password: password,
        level: level,
        username: username
    };
      //axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAxw34Uhl23NbykW6geaqbAiirQHSkkc14', authData)
        axios.post('http://localhost:3000/users', authData)
      .then(response => {
             localStorage.setItem('token', response.headers['x-auth']);
             localStorage.setItem('userId', response.data._id);
             dispatch(authSuccess(response.headers['x-auth'], response.data._id));
             dispatch(userData(response.data));
             explode(response.data.username);
      }).catch(err => {
              dispatch(authFail(err));
          }); 
        };
};

export const login = (email, password) => {
  return dispatch => {
      dispatch(authStart());
      const authData = {
        email: email,
        password: password
    };
     // axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAxw34Uhl23NbykW6geaqbAiirQHSkkc14', authData)
     axios.post('http://localhost:3000/users/login', authData)
     .then(response => {
        localStorage.setItem('token', response.headers['x-auth']);
        localStorage.setItem('userId', response.data._id);
        dispatch(authSuccess(response.headers['x-auth'], response.data._id));
        dispatch(userData(response.data));
        explode(response.data.username);
     }).catch(err => {
              dispatch(authFail(err));
          }); 
    };
};

export const ChecPointskState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
           console.log('Can not get points');}
         else {
                const userId = localStorage.getItem('userId');
                const authData = {
                    token: token,
                    userId: userId
                };
                axios.post('http://localhost:3000/users/getpoints', authData)
                    .then(response => {
                        dispatch(userData(response.data));
                    }).catch(err => {
                        console.log('Error while getting points');
                }); 
            }   
    };
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());}
         else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                const authData = {
                    token: token,
                    userId: userId
                };
                axios.post('http://localhost:3000/users/me', authData)
                    .then(response => {
                        dispatch(userData(response.data));
                        explode(response.data.username);
                    }).catch(err => {
                        dispatch(authFail(err));
                }); 
                // const dbRef =db.ref().orderByChild("userId").equalTo(userId).on('value', function (snapshot) {
                    // dispatch(userData(snapshot.val()));
                    // explode(snapshot.val());})
            }   
    };
};