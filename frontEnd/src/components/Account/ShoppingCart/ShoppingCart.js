import React, { Component } from 'react';
import MyHeader from '../MyHeader/MyHeader';
import classes from './ShoppingCart.css';
class shoppingcart extends Component{
    state = {
        recipes: [{
            recipeId: 1,
            name: "365 Everyday Value, Organic Baby Spinach",
            quantity: 1,
            src: "/static/img/breakfast.png",
            price: 50.99
        },
        {
            recipeId: 2,
            name: "Jennie-O, Lean Ground Turkey",
            quantity: 3,
            src: "/static/img/test.png",
            price: 3.82
        },
        {
            recipeId: 3,
            name: "Organic Valley Organic Free-Range Large Brown Eggs",
            quantity: 1,
            src: "/static/img/wrap.png",
            price: 4.69
        },
        {
            recipeId: 4,
            name: "Aqua Star, Raw, Peeled, Deveined, Tail-off Shrimp, 41-50 Count",
            quantity: 1,
            src: "/static/img/breakfast.png",
            price: 12.3
        }],
        selectedDetail:[{
            id: 1,
            name: "Aqua Star, Raw, Peeled, Deveined, Tail-off Shrimp, 41-50 Count",
            quantity: 1,
            src: "/static/img/shrimp.jpg",
            price: 12.3
        },
        {
            id: 2,
            name: "Organic Valley Organic Free-Range Large Brown Eggs",
            quantity: 1,
            src: "/static/img/egg.jpg",
            price: 4.69
        }],
        selectedId: -1
    }
    componentWillMount(){
        if(this.props.items != undefined){
            this.setState({recipes: this.props.item});
        }
    }
    addQuantityHandler = (id, recipeId) => {
        let oldState = this.state.recipes;
        oldState[id].quantity += 1;
        this.setState({recipes: oldState});
    }
    addQuantityHandlerSub = (id, recipeId) => {
        let oldState = this.state.selectedDetail;
        oldState[id].quantity += 1;
        this.setState({selectedDetail: oldState});
    }
    substractQuantityHandler = (id, recipeId) => {
        let oldState = this.state.recipes;
        if(oldState[id].quantity > 1){
            oldState[id].quantity -= 1;
        }
        this.setState({recipes: oldState});
    }
    substractQuantityHandlerSub = (id, recipeId) => {
        let oldState = this.state.selectedDetail;
        if(oldState[id].quantity > 1){
            oldState[id].quantity -= 1;
        }
        this.setState({selectedDetail: oldState});
    }
    deleteItemHandler = (id,recipeId) => {
        let oldState = this.state.recipes;
        oldState.splice(id,1);
        this.setState({recipes: oldState});
        if(recipeId == this.state.selectedId){
            this.setState({selectedId: -1});
            document.getElementById("detail"+recipeId).style.display = "none";
        }
    }
    deleteItemHandlerSub = (id, recipeId) => {
        let oldState = this.state.selectedDetail;
        oldState.splice(id, 1);
        this.setState({selectedDetail: oldState});
    }
    showDetailHandler = (id) => {
        if(this.state.selectedId != -1){
            document.getElementById("detail"+this.state.selectedId).style.display = "none";
        }
        if(this.state.selectedId == id){
            document.getElementById("detail"+id).style.display = "none";
            id = -1;
        }
        else{
            document.getElementById("detail"+id).style.display = "block";
        }
        this.setState({selectedId: id});
    }
    render(){
        let recipes = this.state.recipes.map((item, id) => {
            let recipeDetail = this.state.selectedDetail.map((detail,idd) => (
                <div key={detail.id}>
                {!this.props.notShow?
                    <div className="row">
                            <div className="col-md-8">
                                <img src={detail.src}/>
                                <a href="#"><strong>{detail.name}</strong></a>
                            </div>
                            {/* <div className="col-md-1">
                                <a id={classes.deleteBtn} onClick={()=>this.deleteItemHandlerSub(idd,detail.id)}>Delete</a>
                            </div> */}
                            <div className="col-md-2">
                                <p style={{marginTop:"25px"}}><strong style={{color:"#C0392B"}}><font>${parseFloat(detail.price * detail.quantity).toFixed(2)}</font></strong></p>
                            </div>
                            <div className="col-md-2">
                                <p style={{marginTop:"25px"}}>
                                    {/* <i className="fas fa-caret-left" onClick={()=>this.substractQuantityHandlerSub(idd, detail.id)} id={classes.modifyQuantity}></i> */}
                                    x {detail.quantity}
                                    {/* <i className="fas fa-caret-right" onClick={()=>this.addQuantityHandlerSub(idd, detail.id)} id={classes.modifyQuantity}></i> */}
                                </p>
                            </div>
                        </div>:
                        <div className="row" key={detail.id}>
                        <div className="col-md-8">
                            <img src={detail.src}/>
                            <a href="#"><strong>{detail.name}</strong></a>
                        </div>
                        <div className="col-md-2">
                            <p><strong style={{color:"#C0392B"}}><font>${parseFloat(detail.price).toFixed(2)}</font></strong></p>
                        </div>
                        <div className="col-md-2">
                            <p>
                                {/* <i className="fas fa-caret-left" onClick={()=>this.substractQuantityHandlerSub(idd, detail.id)} id={classes.modifyQuantity}></i> */}
                                x {detail.quantity}
                                {/* <i className="fas fa-caret-right" onClick={()=>this.addQuantityHandlerSub(idd, detail.id)} id={classes.modifyQuantity}></i> */}
                            </p>
                        </div>
                    </div>
                }
                </div>
            ));
            return(
                <div className={classes.item} key={id}>
                    {!this.props.notShow?
                    <div className="row">
                        <div className="col-md-8" onClick={() => this.showDetailHandler(item.recipeId)}>
                            <img src={item.src}/>
                            <a href="#"><strong>{item.name}</strong></a>
                        </div>
                        <div className="col-md-1">
                            <a id={classes.deleteBtn} onClick={()=>this.deleteItemHandler(id, item.recipeId)}>Delete</a>
                        </div>
                        <div className="col-md-1">
                            <p><strong style={{color:"#C0392B"}}><font>${parseFloat(item.price * item.quantity).toFixed(2)}</font></strong></p>
                        </div>
                        <div className="col-md-2">
                            <p>
                                <i className="fas fa-caret-left" onClick={()=>this.substractQuantityHandler(id, item.recipeId)} id={classes.modifyQuantity}></i>
                                {item.quantity}
                                <i className="fas fa-caret-right" onClick={()=>this.addQuantityHandler(id, item.recipeId)} id={classes.modifyQuantity}></i>
                            </p>
                        </div>
                    </div>:
                    <div className="row" onClick={() => this.showDetailHandler(item.recipeId)}>
                        <div className="col-md-8">
                            <img src={item.src}/>
                            <a href="#"><strong>{item.name}</strong></a>
                        </div>
                        <div className="col-md-2">
                            <p><strong style={{color:"#C0392B"}}><font>Total price: ${parseFloat(item.price * item.quantity).toFixed(2)}</font></strong></p>
                        </div>
                        <div className="col-md-2">
                            <p>
                                {/* <i className="fas fa-caret-left" onClick={()=>this.substractQuantityHandler(id, item.recipeId)} id={classes.modifyQuantity}></i> */}
                                Number: {item.quantity}
                                {/* <i className="fas fa-caret-right" onClick={()=>this.addQuantityHandler(id, item.recipeId)} id={classes.modifyQuantity}></i> */}
                            </p>
                        </div>
                    </div>
                    }
                    <div className={classes.detailBox} id={"detail"+item.recipeId} style={{display: "none"}}>
                        <hr style={{marginBottom:"0px"}}/>
                        {recipeDetail}
                    </div>
                </div>
            )
        });
        return (
            <div className={this.props.displayClass} id="nav-shoppingCart" role="tabpanel" aria-labelledby="nav-shoppingCart-tab" style={this.props.style}>
                <div className={classes.shoppingCart}>
                    {recipes}
                    {!this.props.notShow?
                        <button className="btn btn-default btn-primary" id={classes.checkOut}>CheckOut</button>:
                        <div></div>
                    }
                </div>
                <br/>
                <br/>
            </div>    
        );
    }
}
export default shoppingcart;