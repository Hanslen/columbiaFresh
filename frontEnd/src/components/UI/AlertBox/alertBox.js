import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import * as classes from './alertBox.css';

class alertBox extends Component {

    closeBox = () => {
        this.props.closeAlert();
        console.log(this.props.redirect);
        if (this.props.redirect) {
            this.props.history.push(this.props.redirect);
        }
    }

    render() {
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
        isError: state.auth.isError,
        redirect: state.auth.redirect
    };
}

const mapDispatchToProps = dispatch => {
    return {
        closeAlert: () => dispatch(actions.closeAlert())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(alertBox));
