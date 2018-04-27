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
import Axios from '../../axios-config';
class useraccount extends Component{
    state = {
        shoppingCart: [],
        userId: null
    }
    componentWillMount(){
        const pathName = this.props.history.location.pathname;
        const urlSplit = pathName.split('/');
        if(urlSplit.length == 3){
            this.setState({userId:urlSplit[2]});
        }

    }
    render(){
        if(!this.props.isAuthenticated){
            this.props.history.push('/');
        }
        return (
            <div className="greyBg">

            <div className="accountContainer">
                <MyHeader/>
                <div className="tab-content" id="nav-tabContent">
                    <FavoriteList/>
                    <MyRecipes displayClass="tab-pane fade active show"/>
                </div>
            </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: localStorage.getItem("email") != null,
        userId: localStorage.getItem("uid"),
        token: localStorage.getItem("token")
    }
}
export default connect(mapStateToProps, null)(withRouter(useraccount));