
import React, {Component} from 'react';
import classes from './AccountManage.css';
import Button from '../../UI/Button/Button';
import axios from '../../../axios-config';

class accountManage extends Component{
    confirmHanlder = () => {
        console.log(this.props.match.params.token);
        axios.post('/confirm/' + this.props.match.params.token)
                    .then(response => {
                        console.log(response);
                    }).catch(error=>{
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
export default accountManage;