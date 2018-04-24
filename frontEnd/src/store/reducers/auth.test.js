import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

const initState = {
    username: null,
    email: null,
    error: null,
    alertDisplay: {"display": "none"},
    isError: true,
    loading: false,
    authRedirectPath: '/',
    userId: null,
    token: null,
    img: "http://via.placeholder.com/600x400",
    redirect: ""
};
describe('auth reducer', () =>{
    it('should let auth start', () => {
        expect(reducer(initState, {
            type: actionTypes.AUTH_START
        })).toEqual({
            username: null,
            email: null,
            error: null,
            alertDisplay: {"display": "none"},
            isError: true,
            loading: true,
            authRedirectPath: '/',
            userId: null,
            token: null,
            img: "http://via.placeholder.com/600x400",
            redirect: ""
        })
    })
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initState);
    });
    it('should auth signup', () => {
        expect(reducer(initState, {
            type: actionTypes.AUTH_SIGNUP,
            username: "Jiahe",
            error: null,
            loading: false
        })).toEqual({
            username: "Jiahe",
            email: null,
            error: null,
            alertDisplay: {"display": "none"},
            isError: true,
            loading: false,
            authRedirectPath: '/',
            userId: null,
            token: null,
            img: "http://via.placeholder.com/600x400",
            redirect: ""
        });
    });
    it('should set auth alert', () => {
        expect(reducer(initState, {
            type: actionTypes.SET_AUTH_ALERT,
            error: "An alert message shows"
        })).toEqual({
            username: null,
            email: null,
            error: "An alert message shows",
            alertDisplay: {"display": "none"},
            isError: true,
            loading: false,
            authRedirectPath: '/',
            userId: null,
            token: null,
            img: "http://via.placeholder.com/600x400",
            redirect: ""
    })});
    it('should close alert', () => {
        expect(reducer(initState, {
            type: actionTypes.CLOSE_ALERT,
            error: null,
            alertDisplay: {"display": "none"}
        })).toEqual({
            username: null,
            email: null,
            error: null,
            alertDisplay: {"display": "none"},
            isError: true,
            loading: false,
            authRedirectPath: '/',
            userId: null,
            token: null,
            img: "http://via.placeholder.com/600x400",
            redirect: ""
        });
    });
    it('should set Alert', () => {
        expect(reducer(initState, {
            type: actionTypes.SET_ALERT,
            error: "Setting a alert msg",
            alertDisplay: {"display": "block"},
            isError: false,
            redirect: "someURL"
        })).toEqual({
            username: null,
            email: null,
            error: "Setting a alert msg",
            alertDisplay: {"display": "block"},
            isError: false,
            loading: false,
            authRedirectPath: '/',
            userId: null,
            token: null,
            img: "http://via.placeholder.com/600x400",
            redirect: "someURL"
        })
    })
    it('should auth login', () => {
        expect(reducer(initState, {
            type: actionTypes.AUTH_LOGIN,
            username: "Jiahe",
            error: null,
            loading: false
        })).toEqual({
            username: "Jiahe",
            email: null,
            error: null,
            alertDisplay: {"display": "none"},
            isError: true,
            loading: false,
            authRedirectPath: '/',
            userId: null,
            token: null,
            img: "http://via.placeholder.com/600x400",
            redirect: ""
        });
    })
    it('should auth success', () => {
        expect(reducer(initState, {
            type: actionTypes.AUTH_SUCCESS,
            username: "Jiahe",
            email: "chenjiaheyeah@gmail.com",
            userId: "11",
            error: null,
            loading: false,
            token: "thisisfaketoken",
            img: "imgurl"
        })).toEqual({
            username: "Jiahe",
            email: "chenjiaheyeah@gmail.com",
            error: null,
            alertDisplay: {"display": "none"},
            isError: true,
            loading: false,
            authRedirectPath: '/',
            userId: "11",
            token: "thisisfaketoken",
            img: "imgurl",
            redirect: ""
        });
    });
    it('should log out', () => {
        expect(reducer(initState, {
            type: actionTypes.AUTH_LOGOUT
        })).toEqual(initState);
    });
    it('should auth Fail set error', () => {
        expect(reducer(initState, {
            type: actionTypes.AUTH_FAIL,
            error: "Auth Failed..."
        })).toEqual({
            username: null,
            email: null,
            error: "Auth Failed...",
            alertDisplay: {"display": "none"},
            isError: true,
            loading: false,
            authRedirectPath: '/',
            userId: null,
            token: null,
            img: "http://via.placeholder.com/600x400",
            redirect: ""
        })
    });

});