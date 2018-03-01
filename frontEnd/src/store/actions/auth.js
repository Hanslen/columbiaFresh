import * as actionTypes from './actionTypes';
import axios from '../../axios-config';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expirationTime * 1000);
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'signUp'; 
       if(!isSignUp){
           url = 'logIn';
       }
        axios.post(url,authData)
            .then(response =>{
                    console.log(response);
                    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
                    localStorage.setItem('token',response.data.idToken);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('userId', response.data.localId);
                    dispatch(authSuccess(response.data.idToken, response.data.localId));
                    dispatch(checkAuthTimeout(response.data.expiresIn));
                }
            )
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const authLogIn = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password            
        };
        
        localStorage.setItem('token', email);
        setTimeout(() => {
            console.log("._.");
            dispatch(authSuccess(email, "1"));
        },2000);
        // dispatch(authSuccess(email, "1"));

        // web
        // let url = '/guestLogin';
        // axios.post(url, authData)
        //     .then(response => {
        //         const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
        //         localStorage.setItem('token',response.data.idToken);
        //         localStorage.setItem('expirationDate', expirationDate);
        //         localStorage.setItem('userId', response.data.localId);
        //         dispatch(authSuccess(response.data.idToken, response.data.localId));
        //         dispatch(checkAuthTimeout(response.data.expiresIn));
        //     });
    }
}

export const authSignUp = (email, username, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            name: username,
            email: email,
            pwd: password
        };
        let url = '/register';
        axios.post(url, authData)
            .then(response => {
                console.log(response.data);
                // dispatch(authSuccess(email, username));
                const data = {
                    email: email,
                    url: "http://192.168.0.114:3000/verifyEmail/"+response.data.info
                };
                axios.post('/register/confirm_url', data)
                    .then(response => {
                        console.log(response);
                    }).catch(error=>{
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            });

    }
}
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else{
            // const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // if(expirationDate > new Date()){
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
            //     dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            // }
            // else{
            //     dispatch(logout());
            // }
            
        }
    };
}