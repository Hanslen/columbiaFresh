import React, {Component} from 'react';
import classes from './Button.css';
const Button = (props) => {
    return (
        <button type="button" className="btn btn-primary" id={classes.buttonC} style={props.style} onClick={props.onClick}>{props.btnValue}</button>
    );
}
export default Button;