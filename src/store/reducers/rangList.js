import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';

const initialState = {
    players: null,
    error: false
};

const setRangList = (state, action) => {
    return updatedObject( state, {
        players: action.players,
        error: false
    } );
};

const fetchRangListsFailed = (state, action) => {
    return updatedObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_RANG_LIST: return setRangList(state, action);    
        case actionTypes.FETCH_RANG_LIST_FAILED: return fetchRangListsFailed(state, action);
        default: return state;
    }
};

export default reducer;


