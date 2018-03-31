import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';
const initialState = {
    username: "123",
    email: "che",
    error: null,
    loading: false,
    authRedirectPath: '/',
    userId: null,
    token: null
};

const authStart = (state, action) => {
    return updateObject(state, {error:null, loading:true});
}

const authSuccess = (state, action) =>{
    return updateObject(state, {
        username: action.username,
        email: action.email,
        userId: action.userId,
        error: null,
        loading: false,
        token: action.token
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        username: null,
        email: null
    });
}
const authConfirm = (state, action) => {
    return updateObject(state, {
        username: action.username,
        email: action.email,
        error: null,
        loading: false
    });
}

const authLogIn = (state, action) => {
    return updateObject(state, {
        username: action.username,
        error: null,
        loading: false
    })
}

const authSignUp = (state, action) => {
    return updateObject(state, {
        username: action.username,
        error: null,
        loading: false
    })
}
const updateBasic = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_LOGIN:
            return authLogIn(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_LOGIN:
            return 
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.AUTH_SIGNUP:
            return authSignUp(state, action);
        case actionTypes.AUTH_CONFIRM:
            return authConfirm(state, action);
        case actionTypes.UPDATE_BASIC:
            return state;
        case actionTypes.UPDATE_PASSWORD:
            return state;
        case actionTypes.UPDATE_ADDRESS:
            return state;
        case actionTypes.UPDATE_CREDIT:
            return state;
        default:
            return state
    }
};
export default reducer;