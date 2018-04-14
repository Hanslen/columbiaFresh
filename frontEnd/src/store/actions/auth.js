import * as actionTypes from './actionTypes';
import axios from '../../axios-config';
export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    };
};
export const closeAlert = () => {
    return{
        type: actionTypes.CLOSE_ALERT
    };
};
export const setAlert = (error, isError, redirect='') => {
    console.log(redirect);
    return {
        type: actionTypes.SET_ALERT,
        error: error,
        isError: isError,
        redirect
    };
};
export const setAuthError = (error) => {
    return {
        type: actionTypes.SET_AUTH_ALERT,
        error: error
    }
}

export const authSuccess = (email, username, userId, token, img) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        email: email,
        username: username,
        userId: userId,
        token: token,
        img: img
    };
};
export const updateUserIcon = (imgurl) => {
    localStorage.setItem("img", imgurl);
    return {
        type: actionTypes.UPDATE_USERICON,
        img: imgurl
    };
};
export const authConfirm = (email, username, token) => {
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    return {
        type: actionTypes.AUTH_CONFIRM
    }
}
export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('username');
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(setAlert("You have logged in for 1 hour, for security, please log in again!", true));
            dispatch(logout());
        },expirationTime * 1000);
    };
};

// export const auth = (email, password, isSignUp) => {
//     return dispatch => {
//         dispatch(authStart());
//         const authData = {
//             email: email,
//             password: password,
//             returnSecureToken: true
//         };
//         let url = 'signUp'; 
//        if(!isSignUp){
//            url = 'logIn';
//        }
//         axios.post(url,authData)
//             .then(response =>{
//                     console.log(response);
//                     const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
//                     localStorage.setItem('token',response.data.idToken);
//                     localStorage.setItem('expirationDate', expirationDate);
//                     localStorage.setItem('userId', response.data.localId);
//                     dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.token));
//                     // dispatch(checkAuthTimeout(response.data.expiresIn));
//                 }
//             )
//             .catch(err => {
//                 dispatch(authFail(err.response.data.error));
//             });
//     };
// };

export const authLogIn = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password            
        };
        let url = '/login';
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + 3600*1000);
                localStorage.setItem('username',response.data.uname);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('uid', response.data.uid);
                localStorage.setItem('token', response.data.token); //split
                localStorage.setItem("img", response.data.img);
                dispatch(authSuccess(response.data.email, response.data.uname, response.data.uid,response.data.token, response.data.img));
                dispatch(checkAuthTimeout(3600));
                $("#signModal .close").click();
            }).catch(error => {
                console.log(error.response);
                if(error.response == undefined){
                    dispatch(setAuthError("Connection Failed!"));
                }
                else{
                    dispatch(setAuthError(error.response.data.errorInfo));
                }
            });
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
                console.log(response);
                console.log(response.data);
                const data = {
                    email: email,
                    url: "http://localhost:3000/verifyEmail/"+response.data
                };
                axios.post('/register/confirm_url', data)
                    .then(response => {
                        console.log(response);
                        $("#signModal .close").click();
                        dispatch(setAlert(response.data, false));
                    }).catch(error=>{
                        console.log(error);
                    });
            })
            .catch(error => {
                if(error.response == undefined){
                    dispatch(setAuthError("Connection Fail!"));
                }
                else{
                    dispatch(setAuthError(error.response.data.errorInfo));
                }
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
                dispatch(setAlert(response.data, false));
            })
            .catch(error => {
                dispatch(setAlert("Please check your network connection!", true));
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
                dispatch(setAlert(response.data, false));
            })
            .catch(error => {
                if(error.response){
                    dispatch(setAlert("Old password is wrong!", true));
                }
                else{
                    dispatch(setAlert("Please check your network connection!", true));
                }
            });
    };
}
export const updateAddress = (userId, token, streetAddress1, streetAddress2, city, state,zip) => {
    return dispatch => {
        const updateData = {
            userId: userId, 
            token: token, 
            streetAddress1: streetAddress1, 
            streetAddress2: streetAddress2, 
            city: city, 
            state_province_region: state,
            zipCode: zip
        }
        let url = "/settings/update/address";
        axios.post(url, updateData)
            .then(response => {
                dispatch(setAlert(response.data, false));
            })
            .catch(error => {
                dispatch(setAlert("Please check your network connection!", true));
            })
    }
}
export const updateCredit = (userId, token, name, cardNumber, expirationMonth,expirationYear, cvv) => {
    return dispatch => {
        const updateData = {
            userId: userId, 
            token: token, 
            cardName:name, 
            cardNumber:cardNumber, 
            expirationMonth:expirationMonth,
            expirationYear:expirationYear, 
            CVV: cvv
        };
        let url = "/settings/update/credit";
        axios.post(url, updateData)
            .then(response => {
                dispatch(setAlert(response.data, false));
            })
            .catch(error => {
                dispatch(setAlert("Please check your network connection!", true));
            })
    }
}
export const authCheckState = () => {
    return dispatch => {
        const email = localStorage.getItem('email');
        if(!email){
            dispatch(logout());
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()){
                const username = localStorage.getItem('username');
                const userId = localStorage.getItem('uid');
                const token = localStorage.getItem('token');
                const img = localStorage.getItem("img");
                dispatch(authSuccess(email, username, userId, token, img));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
            else{
                dispatch(setAlert("Your token has been expired.. Please log in again!", true));
                dispatch(logout());
            }
            
        }
    };
}