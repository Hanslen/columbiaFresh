import * as actionTypes from './actionTypes';
import axios from '../../axios-config';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (email, username, userId) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        email: email,
        username: username,
        userId: userId
    };
};
export const authConfirm = (email, username) => {
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    return {
        type: actionTypes.AUTH_CONFIRM
    }
}
export const authFail = (error) => {
    // axios.po
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('email');
    // localStorage.removeItem('expirationDate');
    localStorage.removeItem('username');
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
        
        // setTimeout(() => {
        //     dispatch(authSuccess(email, "1"));
        // },2000);
        // web
        let url = '/login';
        axios.post(url, authData)
            .then(response => {
                if(response.data.status == "Success"){
                    console.log("Login Successfully..");
                    console.log(response);
                    // const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
                    localStorage.setItem('username',response.data.info.uname);
                    // localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('email', response.data.info.email);
                    localStorage.setItem('uid', response.data.info.uid);
                    localStorage.setItem('token', response.data.info.token.split("'")[1]);
                    dispatch(authSuccess(response.data.info.email, response.data.info.uname, response.data.info.uid));
                    // dispatch(checkAuthTimeout(response.data.expiresIn));
                }
                else{
                    console.log("Login failed...");
                    console.log(response);
                }
            }).catch(error => {
                console.log("QAQ");
                console.log(error);
                alert("Connection Failed....");
            });

        // dispatch(authSuccess(email, "1"));
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
                    url: "http://localhost:3000/verifyEmail/"+response.data.token
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

export const updateBasicInformation = (userId, token, firstname, lastname, gender, email, introduction) => {
    return dispatch => {
        const updateData = {
            userId: userId,
            token: token,
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            email: email,
            introduction: introduction
        };
        console.log(updateData);
        let url = "/settings/update/basic";
        axios.post(url, updateData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
};
export const updatePassword = (userId, token, oldPassword, newPassword) => {
    return dispatch => {
        const updateData = {
            userId: userId,
            token: token,
            oldPassword: oldPassword,
            newPassword: newPassword
        };
        let url = "/settings/update/password";
        axios.post(url, updateData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };
}
export const authCheckState = () => {
    return dispatch => {
        const email = localStorage.getItem('email');
        if(!email){
            dispatch(logout());
        }
        else{
            // const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // if(expirationDate > new Date()){
                const username = localStorage.getItem('username');
                dispatch(authSuccess(email, username));
            //     dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            // }
            // else{
            //     dispatch(logout());
            // }
            
        }
    };
}