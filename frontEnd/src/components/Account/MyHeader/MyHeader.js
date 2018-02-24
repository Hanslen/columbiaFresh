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
                        <a className="nav-item nav-link accountHeader" 
                            id="nav-myOrder-tab" 
                            data-toggle="tab" 
                            href="#nav-myOrder" 
                            role="tab" 
                            aria-controls="nav-myOrder" 
                            aria-selected="true">
                            <i className="fas fa-home" style={{color:"#00c091"}}></i>My Orders</a>
                        <a className="nav-item nav-link accountHeader" 
                            id="nav-shoppingCart-tab" 
                            data-toggle="tab" 
                            href="#nav-shoppingCart" 
                            role="tab" 
                            aria-controls="nav-shoppingCart" 
                            aria-selected="false">
                            <i className="fas fa-shopping-cart" style={{color:"#02b5da"}}></i>Shopping Cart</a>
                        <a className="nav-item nav-link accountHeader" 
                            id="nav-myRecipes-tab" 
                            data-toggle="tab" 
                            href="#nav-myRecipes" 
                            role="tab" 
                            aria-controls="nav-myRecipes" 
                            aria-selected="false">
                            <i className="fas fa-utensils" style={{color:"#ff5d47"}}></i>My Recipes</a>
                        <a className="nav-item nav-link accountHeader active" 
                            id="nav-favoriteList-tab" 
                            data-toggle="tab" 
                            href="#nav-favoriteList" 
                            role="tab" 
                            aria-controls="nav-favoriteList" 
                            aria-selected="false">
                            <i className="fas fa-star" style={{color:"#fb7299"}}></i>Favorite List</a>
                        <a className="nav-item nav-link accountHeader" 
                            id="nav-settings-tab" 
                            data-toggle="tab" 
                            href="#nav-settings" 
                            role="tab" 
                            aria-controls="nav-settings" 
                            aria-selected="false">
                            <i className="fas fa-cog" style={{color:"#f3a034"}}></i>Settings</a>
                    </div>
                    <br/>
                </nav>
            </div>
        );
    }
}
export default myheader;