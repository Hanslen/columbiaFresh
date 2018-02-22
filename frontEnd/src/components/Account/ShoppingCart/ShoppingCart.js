import React, { Component } from 'react';
import MyHeader from '../MyHeader/MyHeader';
import classes from './ShoppingCart.css';
class shoppingcart extends Component{
    state = {
        items: [{
            name: "Quaker Instant Oatmeal Variety Pack",
            quality: "3",
            src: "/static/img/order.jpg",
            price: "12.3"
        }]
    }
    render(){
        return (
            <div className="tab-pane fade show active" id="nav-shoppingCart" role="tabpanel" aria-labelledby="nav-shoppingCart-tab">
                <div className={classes.shoppingCart}>
                    <div className="row">
                        <div className="col-md-8">Items</div>
                        <div className="col-md-2">Price</div>
                        <div className="col-md-2">Quantity</div>
                    </div>
                    <hr/>
                    <div className={classes.item}>
                        <div className="row">
                            <div className="col-md-8">
                                <img src={this.state.items[0].src}/>
                                <a href="#">{this.state.items[0].name}</a>
                            </div>
                            <div className="col-md-2">
                                <p>${this.state.items[0].price}</p>
                            </div>
                            <div className="col-md-2"><p>{this.state.items[0].quality}</p></div>
                        </div>
                    </div>
                </div>
            </div>    
        );
    }
}
export default shoppingcart;