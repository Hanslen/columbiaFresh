import React, { Component } from 'react';
import Axios from '../../axios-config';
import * as classes from './Supplier.css'; 
class Supplier extends Component{
    render(){
        return (<div className={classes.supplierContainer}>
            <div className={classes.card}>
                <img src="/static/img/Jiahe.jpg" alt="Jiahe"/>
                <h1>Jiahe Chen</h1>
                <p className={classes.title}>Vegetable Supplier</p>
                {/* <p>Columbia University</p> */}
                <a href="#"><i class="fa fa-dribbble"></i></a> 
                <a href="#"><i class="fa fa-twitter"></i></a> 
                <a href="#"><i class="fa fa-linkedin"></i></a> 
                <a href="https://www.facebook.com/chen.hanslen"><i class="fa fa-facebook"></i></a> 
                <a href="tel:555-555-5555"><button className={classes.contactBtn}>Contact</button></a>
                </div>
                <div className={classes.card}>
                <img src="/static/img/ding.png" alt="Ding"/>
                <h1>Yi Ding</h1>
                <p className={classes.title}>Oil Supplier</p>
                {/* <p>Columbia University</p> */}
                <a href="#"><i class="fa fa-dribbble"></i></a> 
                <a href="#"><i class="fa fa-twitter"></i></a> 
                <a href="#"><i class="fa fa-linkedin"></i></a> 
                <a href="https://www.facebook.com/yi.ding.cute"><i class="fa fa-facebook"></i></a> 
                <a href="tel:555-555-5555"><button className={classes.contactBtn}>Contact</button></a>
                </div>
                <div className={classes.card}>
                <img src="/static/img/zhang.jpg" alt="Hanyi"/>
                <h1>Hanyi Zhang</h1>
                <p className={classes.title}>Beef Supplier</p>
                {/* <p>Columbia University</p> */}
                <a href="#"><i class="fa fa-dribbble"></i></a> 
                <a href="#"><i class="fa fa-twitter"></i></a> 
                <a href="#"><i class="fa fa-linkedin"></i></a> 
                <a href="https://www.facebook.com/sylvanus.paul.906"><i class="fa fa-facebook"></i></a> 
                <a href="tel:555-555-5555"><button className={classes.contactBtn}>Contact</button></a>
                </div>
                <div className={classes.card}>
                <img src="/static/img/cai.png" alt="Ningchao"/>
                <h1>Ningchao Cai</h1>
                <p className={classes.title}>Pork Supplier</p>
                {/* <p>Columbia University</p> */}
                <a href="#"><i class="fa fa-dribbble"></i></a> 
                <a href="#"><i class="fa fa-twitter"></i></a> 
                <a href="#"><i class="fa fa-linkedin"></i></a> 
                <a href="https://www.facebook.com/profile.php?id=100007157595917"><i class="fa fa-facebook"></i></a> 
                <a href="tel:555-555-5555"><button className={classes.contactBtn}>Contact</button></a>
                </div>
        </div>);
    }
}
export default Supplier;