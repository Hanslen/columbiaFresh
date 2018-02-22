import React from 'react';
import classes from './Footer.css';
const footer = () => (
  <footer className="text-muted" id={classes.footerBody}>
      <div className="container">
        <p className="float-right">
          <a href="#">Back to top</a>
        </p>
        <p>Columbia Fresh &copy; ASE, team member: Cai Ningchao, Chen Jiahe, Ding Yi, Zhang Hanyi</p>
        <p>Suppiler</p>
        <p>Others</p>
      </div>
    </footer>
);
export default footer;
