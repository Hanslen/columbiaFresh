import React, {Component } from 'react';
import * as classes from './EmptyBox.css';
const EmptyBox = (props) => (
    <div className={classes.emptyContainer}>
        <img src="static/img/error.png"/>
        <p>{props.msg}</p>
    </div>
);
export default EmptyBox;