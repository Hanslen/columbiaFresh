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
    state = {
        shoppingCart: []
    }
    componentWillMount(){
        const postData = {
            uid: this.props.userId,
            token: this.props.token
        }
        Axios.post('/shoppingCart', postData).then(response=>{
            console.log("Response");
            console.log(response.data);
            this.setState({shoppingCart: response.data});
        }).catch(function(error){
            console.log("Error");
            console.log(error.response);
        });
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
                        <ShoppingCart displayClass="tab-pane fade" notShow={false} items={this.state.shoppingCart}/>
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