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
                    <span className={classes.close} onClick={this.closeBox}>&times;</span>
                    <p>{this.props.alertMsg}</p>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        alertMsg: state.auth.error,
        display: state.auth.alertDisplay
    };
}
const mapDispatchToProps = dispatch => {
    return {
        closeAlert: () => dispatch(actions.closeAlert())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(alertBox);