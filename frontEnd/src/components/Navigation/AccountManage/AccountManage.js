
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
        // console.log(this.props.match.params.token);
        document.getElementById("confirmLoading").style.display = "block";
        const token = this.props.match.params.token.split("'");
        console.log(token[1]);

        axios.post('/confirm/' + token[1])
                    .then(response => {
                        if(response.data.status == "Success"){
                            console.log("Confirm Success..");
                            //set localStorage
                            console.log(response);
                            this.props.onConfirmEmail(response.data.info.email, response.data.info.uname);
                            document.getElementById("confirmLoading").style.display = "none";
                            this.props.history.push("/");
                        }
                    }).catch(error=>{
                        alert("Verfication Failed..");
                        document.getElementById("confirmLoading").style.display = "none";
                        console.log(error);
                    });
    }
    render(){
        return(
            <div className={classes.main}>
                <p>Hi, <br/>Please verify your email address!</p>
                <a onClick={this.confirmHanlder}><Button value="Verify Email" style={{marginLeft:'20%'}}/></a>
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
        onConfirmEmail: (email, username) => dispatch(actions.authConfirm(email, username))
    }
  }
export default connect(null, mapDispatchToProps)(withRouter(accountManage));