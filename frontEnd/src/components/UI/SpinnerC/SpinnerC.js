import React from 'react';
import classes from './SpinnerC.css';
const spinnerc = (props) => (
    <div className={classes.spinner}>
  <div className={classes.dot1}></div>
  <div className={classes.dot2}></div>
</div>
);

export default spinnerc;