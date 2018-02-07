import React, { Component } from 'react';
import classes from './MyHeader.css';
class myheader extends Component{
    render(){
        let navItem = ["nav", "nav-tabs",classes.profileNav];
        return (
            <div>
                <div className={classes.headerImg}>
                    <div className={classes.introBox}>
                        <img className={classes.imgIcon}src="/static/img/user.jpg"/>
                        <div className={classes.introText}>
                            <p><strong>Teacher Ding</strong></p>
                            <p>Why Teacher Ding is so Blood?!</p>
                        </div>
                    </div>    
                </div>
                <nav>
                    <div className={navItem.join(" ")} id="nav-tab" role="tablist">
                        <a className="nav-item nav-link accountHeader" id="nav-myOrder-tab" data-toggle="tab" href="#nav-myOrder" role="tab" aria-controls="nav-myOrder" aria-selected="true">My Orders</a>
                        <a className="nav-item nav-link accountHeader" id="nav-favoriteList-tab" data-toggle="tab" href="#nav-favoriteList" role="tab" aria-controls="nav-favoriteList" aria-selected="false">Favorite List</a>
                        <a className="nav-item nav-link accountHeader" id="nav-shoppingCart-tab" data-toggle="tab" href="#nav-shoppingCart" role="tab" aria-controls="nav-shoppingCart" aria-selected="false">Shopping Cart</a>
                        <a className="nav-item nav-link accountHeader active" id="nav-settings-tab" data-toggle="tab" href="#nav-settings" role="tab" aria-controls="nav-settings" aria-selected="false">Settings</a>
                    </div>
                    <br/>
                </nav>
            </div>
        );
    }
}
export default myheader;