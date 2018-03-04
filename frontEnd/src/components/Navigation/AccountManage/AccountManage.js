
import React, {Component} from 'react';
import classes from './AccountManage.css';
import Button from '../../UI/Button/Button';
import axios from '../../../axios-config';
import {withRouter} from "react-router-dom";

class accountManage extends Component{
    confirmHanlder = () => {
        // console.log(this.props.match.params.token);
        const token = this.props.match.params.token.split("'");
        console.log(token[1]);
        axios.post('/confirm/' + token[1])
                    .then(response => {
                        console.log(response);
                        if(response.data.status == "Success"){
                            console.log("Confirm Success..");
                            this.props.history.push("/");
                        }
                    }).catch(error=>{
                        alert("Verfication Failed..");
                        console.log(error);
                    })
    }
    render(){
        return(
            <div className={classes.main}>
                <p>Hi, <br/>Please verify your email address!</p>
                <a onClick={this.confirmHanlder}><Button value="Verify Email" style={{marginLeft:'20%'}}/></a>
                <p>Thanks!<br/>-- Team Columbia Fresh</p>
                <br/>
            </div>
        );
    }
}
export default withRouter(accountManage);