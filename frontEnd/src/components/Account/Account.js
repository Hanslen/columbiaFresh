import React, { Component } from 'react';
import MyHeader from './MyHeader/MyHeader';
import FavoriteList from './FavoriteList/FavoriteList';
import Settings from './Settings/Settings';
import MyOrders from './MyOrders/MyOrders';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import MyRecipes from '../MyRecipes/MyRecipes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { stat } from 'fs';
class account extends Component{
    render(){
        if(!this.props.isAuthenticated){
            this.props.history.push('/');
        }
        return (
            <div className="greyBg">
                <div className="accountContainer">
                    <MyHeader/>
                    <div className="tab-content" id="nav-tabContent">
                        <MyOrders/>
                        <FavoriteList/>
                        <ShoppingCart displayClass="tab-pane fade"/>
                        <MyRecipes/>
                        <Settings/>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.email != null
    }
}
export default connect(mapStateToProps, null)(withRouter(account));