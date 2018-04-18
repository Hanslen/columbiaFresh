import React from 'react';
import classes from './Footer.css';
import { Link } from 'react-router-dom';
const footer = () => (
  <footer className="text-muted" id={classes.footerBody}>
      <div className="container">
        <p className="float-right">
          <a href="#">Back to top</a>
        </p>
        <p>Columbia Fresh &copy; ASE, team member: Cai Ningchao, Chen Jiahe, Ding Yi, Zhang Hanyi</p>
        <Link to="/supplier">Suppiler</Link>
        {/* <p>Others</p> */}
      </div>
    </footer>
);
export default footer;
