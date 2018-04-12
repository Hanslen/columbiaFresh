import React from 'react';

import classes from './Spinner.css';

const spinner = (props) => (
    <div>
        <div className={classes.Loader}>
        </div>
        <p className={classes.loaderP}>Loading...</p>
    </div>
);

export default spinner;