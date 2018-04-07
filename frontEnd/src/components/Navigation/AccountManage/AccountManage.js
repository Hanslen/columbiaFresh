
import React, {Component} from 'react';
import classes from './AccountManage.css';
import Button from '../../UI/Button/Button';
import axios from '../../../axios-config';
import {withRouter} from "react-router-dom";
import Spinner from '../../UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class accountManage extends Component{
    confirmHanlder = () => {
        document.getElementById("confirmLoading").style.display = "block";
        const token = this.props.match.params.token.split("'");
        console.log("=(:3=)_");
        console.log(token[0]);
        axios.post('/confirm/' + token[0])
                    .then(response => {
                        console.log("QWQ");
                        //set localStorage
                        // this.props.authSuccess(response.data.email, response.data.uname, response.data.uid, token[0]);
                        document.getElementById("confirmLoading").style.display = "none";
                        this.props.setAlert("Confirm Successfully! You can Log in now :D", false);
                        this.props.history.push("/");
                        
                    }).catch(error=>{
                        console.log("QAQ");
                        document.getElementById("confirmLoading").style.display = "none";
                        this.props.setAlert("The Link has Expired! Please register again!", true);

                    });
        console.log("end");
    }
    render(){
        return(
            <div className={classes.main}>
                <p>Hi, <br/>Please verify your email address!</p>
                <a onClick={this.confirmHanlder}><Button btnValue="Verify Email" style={{marginLeft:'20%'}}/></a>
                <div style={{display:"none"}} id="confirmLoading">
                    <Spinner/>
                </div>
                <p>Thanks!<br/>-- Team Columbia Fresh</p>
                <br/>
            </div>
        );
    }
}

  const mapDispatchToProps = dispatch => {
    return {
        onConfirmEmail: (email, username, token) => dispatch(actions.authConfirm(email, username, token)),
        authSuccess: (email, username, userId, token) => dispatch(actions.authSuccess(email, username, userId, token)),
        setAlert: (error, isError) => dispatch(actions.setAlert(error, isError))
    }
  }
export default connect(null, mapDispatchToProps)(withRouter(accountManage));