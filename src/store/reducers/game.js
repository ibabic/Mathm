import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';


const initialState = {
    user: null,
    isOpen: false
};

const userData = (state, action) => {
   
    return updatedObject( state, {
        user: action.user
    } );
};

const hmaTog = (state, action) => {
   
    return updatedObject( state, {
        isOpen: !state.isOpen
    } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.USER_DATA: return userData(state, action); 
        case actionTypes.HAM_TOG: return hmaTog(state, action);   
        default: return state;
    }
};


export default reducer;