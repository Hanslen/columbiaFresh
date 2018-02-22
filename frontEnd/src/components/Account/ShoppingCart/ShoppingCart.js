import React, { Component } from 'react';
import MyHeader from '../MyHeader/MyHeader';
import classes from './ShoppingCart.css';
class shoppingcart extends Component{
    state = {
        items: [{
            name: "Quaker Instant Oatmeal Variety Pack",
            quantity: 3,
            src: "/static/img/order.jpg",
            price: 12.3
        },
        {
            name: "Quaker Instant Oatmeal Variety Pack",
            quantity: 3,
            src: "/static/img/order.jpg",
            price: 12.3
        },
        {
            name: "Quaker Instant Oatmeal Variety Pack",
            quantity: 3,
            src: "/static/img/order.jpg",
            price: 12.3
        },
        {
            name: "Quaker Instant Oatmeal Variety Pack",
            quantity: "3",
            src: "/static/img/order.jpg",
            price: 12.3
        }]
    }
    addQuantityHandler = (id) => {
        let oldState = this.state.items;
        oldState[id].quantity += 1;
        this.setState({items: oldState});
    }
    substractQuantityHandler = (id) => {
        let oldState = this.state.items;
        if(oldState[id].quantity > 1){
            oldState[id].quantity -= 1;
        }
        this.setState({items: oldState});
    }
    render(){
        let items = this.state.items.map((item, id) => (
            <div className={classes.item} key={id}>
            <div className="row">
                <div className="col-md-8">
                    <img src={item.src}/>
                    <a href="#"><strong>{item.name}</strong></a>
                    <a id={classes.deleteBtn}>Delete</a>
                </div>
                <div className="col-md-2">
                    <p><strong style={{color:"#C0392B"}}><font>${parseFloat(item.price * item.quantity).toFixed(2)}</font></strong></p>
                </div>
                <div className="col-md-2">
                    <p>
                        <i className="fas fa-caret-left" onClick={()=>this.substractQuantityHandler(id)} id={classes.modifyQuantity}></i>
                        {item.quantity}
                        <i className="fas fa-caret-right" onClick={()=>this.addQuantityHandler(id)} id={classes.modifyQuantity}></i>
                    </p>
                </div>
            </div>
        </div>
        ));
        return (
            <div className="tab-pane fade" id="nav-shoppingCart" role="tabpanel" aria-labelledby="nav-shoppingCart-tab">
                <div className={classes.shoppingCart}>
                    {items}
                    <button className="btn btn-default btn-primary" id={classes.checkOut}>CheckOut</button>
                </div>
                <br/>
                <br/>
            </div>    
        );
    }
}
export default shoppingcart;