import axios from 'axios';
import * as actionTypes from './actionTypes';

export const setRangList = ( players ) => {
    return {
        type: actionTypes.SET_RANG_LIST,
        players: players
    };
};

export const fetchRangListsFailed = () => {
    return {
        type: actionTypes.FETCH_RANG_LIST_FAILED
    };
};

export const rangList = () => {
    return dispatch => {
        axios.get( 'http://localhost:3000/users/rangList' )
            .then( response => {
                //console.log(response.data);
               dispatch(setRangList(response.data));
            } )
            .catch( error => {
                //console.log(error.response.data.error);
                dispatch(fetchRangListsFailed());
            } );
    };
};