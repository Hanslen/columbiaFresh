import * as actionTypes from './actionTypes';
import axios from '../../axios-config';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (email, username, userId, token) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        email: email,
        username: username,
        userId: userId,
        token: token
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
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
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
                    dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.token));
                    // dispatch(checkAuthTimeout(response.data.expiresIn));
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
                    localStorage.setItem('token', response.data.info.token); //split
                    dispatch(authSuccess(response.data.info.email, response.data.info.uname, response.data.info.uid,response.data.info.token));
                    // dispatch(checkAuthTimeout(response.data.expiresIn));
                    // alert(response.data.info);
                }
                else{
                    alert(response.data.info);
                    // console.log("Login failed...");
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
                    });
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
                alert(response.data.msg);
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
                alert(response.data.msg);
            })
            .catch(error => {
                console.log(error);
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
        // console.log(updateData);
        axios.post(url, updateData)
            .then(response => {
                console.log(response.data);
                alert(response.data.msg);
            })
            .catch(error => {
                console.log(error);
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
                console.log(response.data);
                if(response.data == true){
                    alert("Update CreditCard Successfully!");
                }
                else{
                    alert("Failed update...");
                }
            })
            .catch(error => {
                console.log(error);
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