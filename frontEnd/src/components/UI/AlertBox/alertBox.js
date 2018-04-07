import React, { Component } from 'react';
import * as classes from './alertBox.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
class alertBox extends Component{
    closeBox = () => {
        this.props.closeAlert();
    }
    render(){
        return (
            <div id={classes.alertModal} className={classes.alertModalBox} style={this.props.display}>
                <div className={classes.alertmodalcontent}>
                    {this.props.isError?
                    <img src="/static/img/cuteerror.png" className={classes.alertImg}/>
                    :
                    <img src="/static/img/cutesuccess.png" className={classes.alertImg}/>
                    }
                    <p>{this.props.alertMsg}</p>
                    {/* <p>Upload information successfully</p> */}
                    <span className={classes.close} onClick={this.closeBox}>&times;</span>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        alertMsg: state.auth.error,
        display: state.auth.alertDisplay,
        isError: state.auth.isError
    };
}
const mapDispatchToProps = dispatch => {
    return {
        closeAlert: () => dispatch(actions.closeAlert())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(alertBox);