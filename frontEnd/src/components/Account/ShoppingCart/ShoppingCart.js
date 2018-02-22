import React, { Component } from 'react';
import MyHeader from '../MyHeader/MyHeader';
import classes from './ShoppingCart.css';
class shoppingcart extends Component{
    state = {
        recipes: [{
            name: "365 Everyday Value, Organic Baby Spinach",
            quantity: 1,
            src: "/static/img/veg.jpg",
            price: 50.99
        },
        {
            name: "Jennie-O, Lean Ground Turkey",
            quantity: 3,
            src: "/static/img/meat.jpg",
            price: 3.82
        },
        {
            name: "Organic Valley Organic Free-Range Large Brown Eggs",
            quantity: 1,
            src: "/static/img/egg.jpg",
            price: 4.69
        },
        {
            name: "Aqua Star, Raw, Peeled, Deveined, Tail-off Shrimp, 41-50 Count",
            quantity: 1,
            src: "/static/img/shrimp.jpg",
            price: 12.3
        }],
        selectedDetail:[{
            name: "Aqua Star, Raw, Peeled, Deveined, Tail-off Shrimp, 41-50 Count",
            quantity: 1,
            src: "/static/img/shrimp.jpg",
            price: 12.3
        },
        {
            name: "Aqua Star, Raw, Peeled, Deveined, Tail-off Shrimp, 41-50 Count",
            quantity: 1,
            src: "/static/img/shrimp.jpg",
            price: 12.3
        }]
    }
    addQuantityHandler = (id) => {
        let oldState = this.state.recipes;
        oldState[id].quantity += 1;
        this.setState({recipes: oldState});
    }
    substractQuantityHandler = (id) => {
        let oldState = this.state.recipes;
        if(oldState[id].quantity > 1){
            oldState[id].quantity -= 1;
        }
        this.setState({recipes: oldState});
    }
    deleteItemHandler = (id) => {
        let oldState = this.state.recipes;
        oldState.splice(id,1);
        this.setState({recipes: oldState});
    }
    render(){
        let recipes = this.state.recipes.map((item, id) => {
            return(
            <div className={classes.item} key={id}>
            <div className="row">
                <div className="col-md-8">
                    <img src={item.src}/>
                    <a href="#"><strong>{item.name}</strong></a>
                </div>
                <div className="col-md-1">
                    <a id={classes.deleteBtn} onClick={()=>this.deleteItemHandler(id)}>Delete</a>
                </div>
                <div className="col-md-1">
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
            <div className={classes.detailBox} id={"detail"+id} style={{display: "block"}}>

            </div>
        </div>
            )
        });
        return (
            <div className="tab-pane fade active show" id="nav-shoppingCart" role="tabpanel" aria-labelledby="nav-shoppingCart-tab">
                <div className={classes.shoppingCart}>
                    {recipes}
                    <button className="btn btn-default btn-primary" id={classes.checkOut}>CheckOut</button>
                </div>
                <br/>
                <br/>
            </div>    
        );
    }
}
export default shoppingcart;