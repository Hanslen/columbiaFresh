import React, { Component } from 'react';
import Axios from '../../axios-config';
import * as classes from './Supplier.css'; 
class Supplier extends Component{
    render(){
        return (<div>
            <div className={classes.card}>
                <img src="/w3images/team2.jpg" alt="John" style={{"width":"100%"}}/>
                <h1>Jiahe Chen</h1>
                <p className={classes.title}>Vegetable Supplier</p>
                <p>Columbia University</p>
                {/* <div style={{"margin": "24px 0"}}>
                    <a href="#"><i class="fa fa-dribbble"></i></a> 
                    <a href="#"><i class="fa fa-twitter"></i></a>  
                    <a href="#"><i class="fa fa-linkedin"></i></a>  
                    <a href="#"><i class="fa fa-facebook"></i></a> 
                </div> */}
                <p><button className={classes.contactBtn}>Contact</button></p>
                </div>
        </div>);
    }
}
export default Supplier;