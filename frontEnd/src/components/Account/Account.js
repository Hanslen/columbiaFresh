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
class account extends Component{
    componentWillMount(){
        const postData = {
            userId: this.props.userId,
            token: this.props.token
        }
        // Axios.post('/shoppingCart', postData).then(response=>{
        //     console.log(response);
        // }).catch(error => {
        //     console.log(error);
        // });
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
                        <MyOrders/>
                        <FavoriteList/>
                        <ShoppingCart displayClass="tab-pane fade" items={null}/>
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
        isAuthenticated: localStorage.getItem("email") != null,
        userId: localStorage.getItem("uid"),
        token: localStorage.getItem("token")
    }
}
export default connect(mapStateToProps, null)(withRouter(account));