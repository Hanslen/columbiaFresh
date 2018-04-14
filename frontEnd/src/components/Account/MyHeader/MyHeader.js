import React, { Component } from 'react';
import classes from './MyHeader.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class myheader extends Component{
    componentDidMount(){
        if(this.props.history.location.hash == "#settings"){
            $("#nav-settings-tab").trigger("click");
            this.props.history.push ("/myprofile");
        }
        else if(this.props.history.location.hash == "#shoppingcart"){
            $("#nav-shoppingCart-tab").trigger("click");
            this.props.history.push ("/myprofile");
        }
        else if(this.props.history.location.hash == "#order"){
            $("#nav-myOrder-tab").trigger("click");
            this.props.history.push("/myprofile");
        }
    }
    componentWillReceiveProps(){
        if(this.props.history.location.hash == "#settings"){
            $("#nav-settings-tab").trigger("click");
            this.props.history.push ("/myprofile");
        }
        else if(this.props.history.location.hash == "#shoppingcart"){
            $("#nav-shoppingCart-tab").trigger("click");
            this.props.history.push ("/myprofile");
        }
        else if(this.props.history.location.hash == "#order"){
            $("#nav-myOrder-tab").trigger("click");
            this.props.history.push("/myprofile");
        }
    }
    render(){
        let navItem = ["nav", "nav-tabs",classes.profileNav];
        return (
            <div>
                <div className={classes.headerImg}>
                    <div className={classes.introBox}>
                        <img className={classes.imgIcon} src="/static/img/userIcon.png"/>
                        <div className={classes.introText}>
                            <p><strong>{this.props.username}</strong></p>
                            <p>Manage and check my profile. :D</p>
                        </div>
                    </div>    
                </div>
                <nav>
                    <div className={navItem.join(" ")} id="nav-tab" role="tablist">
                        <a className="nav-item nav-link accountHeader active" 
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
                        <a className="nav-item nav-link accountHeader" 
                            id="nav-favoriteList-tab" 
                            data-toggle="tab" 
                            href="#nav-favoriteList" 
                            role="tab" 
                            aria-controls="nav-favoriteList" 
                            aria-selected="false">
                            <i className="fas fa-star" style={{color:"#fb7299"}}></i>My Favorites</a>
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
const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        token: state.auth.token,
        username: state.auth.username
    }
}
export default withRouter(connect(mapStateToProps, null)(myheader));