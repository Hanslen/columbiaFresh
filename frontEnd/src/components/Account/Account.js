import React, { Component } from 'react';
import MyHeader from './MyHeader/MyHeader';
import FavoriteList from './FavoriteList/FavoriteList';
import Settings from './Settings/Settings';
import MyOrders from './MyOrders/MyOrders';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import MyRecipes from '../MyRecipes/MyRecipes';
class account extends Component{
    render(){
        return (
            <div className="greyBg">
                <div className="accountContainer">
                    <MyHeader/>
                    <div className="tab-content" id="nav-tabContent">
                        <MyOrders/>
                        <FavoriteList/>
                        <ShoppingCart/>
                        <MyRecipes/>
                        <Settings/>
                    </div>
                </div>
            </div>
        );
    }
}
export default account;