import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyHeader from '../MyHeader/MyHeader';
import classes from './ShoppingCart.css';
import Spinner from '../../UI/Spinner/Spinner';
import EmptyBox from '../EmptyBox/EmptyBox';
import Axios from '../../../axios-config';
import {connect} from 'react-redux';
class shoppingcart extends Component{
    state = {
        loading: true,
        recipes: [],
        selectedId: -1
    }
    componentDidMount(){
        // if(this.props.items != undefined){
        //     this.setState({recipes: this.props.item});
        // }
        if(this.props.items == null){
            this.setState({loading: false, recipes: []});
        }
    }
    componentWillReceiveProps(nextPros){
        if(nextPros.items != this.state.recipes){
            this.setState({loading: false, recipes: nextPros.items});
        }
    }
    
    addQuantityHandler = (id, recipeId) => {
        let oldState = this.state.recipes;
        oldState[id].number += 1;
        const postData = {
            userId: this.props.userId,
            token: this.props.token,
            rid: recipeId
        };
        console.log(postData);
        Axios.post("/recipe/increasenum", postData).then(res=>{

        }).catch(err=>{
            console.log(err.response);
        });
        this.setState({recipes: oldState});
    }
    substractQuantityHandler = (id, recipeId) => {
        let oldState = this.state.recipes;
        if(oldState[id].number > 1){
            oldState[id].number -= 1;
            const postData = {
                userId: this.props.userId,
                token: this.props.token,
                rid: recipeId
            };
            Axios.post("/recipe/decreasenum", postData).then(res=>{
    
            }).catch(err=>{
    
            });
        }

        this.setState({recipes: oldState});
    }
    deleteItemHandler = (id,recipeId) => {
        let oldState = this.state.recipes;
        oldState.splice(id,1);
        this.setState({recipes: oldState});
        if(recipeId == this.state.selectedId){
            this.setState({selectedId: -1});
            document.getElementById("detail"+recipeId).style.display = "none";
        }
        const postData = {
            userId: this.props.userId,
            token: this.props.token,
            rid: recipeId
        };
        console.log(recipeId);
        Axios.post("/deleteShoppingCartItem", postData).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
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
            console.log("detail"+id);
            document.getElementById("detail"+id).style.display = "block";
        }
        this.setState({selectedId: id});
    }
    render(){
        let recipes = <EmptyBox msg="No recipes have been added to the shopping cart yet."/>;
        if(this.state.recipes != null && this.state.recipes == 1){
            recipes = <EmptyBox msg="Please connect to network to load order details!"/>
        }
        if(this.state.recipes != null && this.state.recipes != 1 && this.state.recipes.length != 0){
            recipes = this.state.recipes.map((item, id) => {
                // console.log(item);
                let recipeDetail = item.ingredient.map((detail,idd) => (
                    <div key={detail.title+"ingredint"}>
                    {!this.props.notShow?
                        <div className="row">
                                <div className="col-md-8">
                                    {/* <img src={detail.img}/> */}
                                    <br/>
                                    <a href="#"><strong>{detail.title}</strong></a>
                                </div>
                                <div className="col-md-2">
                                    <p style={{marginTop:"25px"}}><strong style={{color:"#C0392B"}}><font>${parseFloat(detail.price * detail.number).toFixed(2)}</font></strong></p>
                                </div>
                                <div className="col-md-2">
                                    <p style={{marginTop:"25px"}}>
                                        x {detail.number}
                                    </p>
                                </div>
                            </div>:
                            <div className="row" key={detail.id}>
                            <div className="col-md-8">
                                {/* <img src={detail.img}/> */}
                                <br/>
                                <a href="#"><strong>{detail.title}</strong></a>
                            </div>
                            <div className="col-md-2">
                                <p><strong style={{color:"#C0392B"}}><font>${parseFloat(detail.price).toFixed(2)}</font></strong></p>
                            </div>
                            <div className="col-md-2">
                                <p>
                                    x {detail.number}
                                </p>
                            </div>
                        </div>
                    }
                    </div>
                ));
                
                return(
                    <div className={classes.item} key={id+"box"}>
                        {!this.props.notShow?
                        <div className="row">
                            <div className="col-md-8" onClick={() => this.showDetailHandler(item.recipeId)}>
                                <img src={item.img}/>
                                <a href="#"><strong>{item.title}</strong></a>
                            </div>
                            <div className="col-md-1">
                                <a id={classes.deleteBtn} onClick={()=>this.deleteItemHandler(id, item.recipeId)}>Delete</a>
                            </div>
                            <div className="col-md-1">
                                <p><strong style={{color:"#C0392B"}}><font>${parseFloat(item.price * item.number).toFixed(2)}</font></strong></p>
                            </div>
                            <div className="col-md-2">
                                <p>
                                    <i className="fas fa-caret-left" onClick={()=>this.substractQuantityHandler(id, item.recipeId)} id={classes.modifyQuantity}></i>
                                    {item.number}
                                    <i className="fas fa-caret-right" onClick={()=>this.addQuantityHandler(id, item.recipeId)} id={classes.modifyQuantity}></i>
                                </p>
                            </div>
                        </div>:
                        <div className="row" onClick={() => this.showDetailHandler(item.recipeId)}>
                            <div className="col-md-8">
                                <img src={item.img}/>
                                <a href="#"><strong>{item.title}</strong></a>
                            </div>
                            <div className="col-md-2">
                                <p><strong style={{color:"#C0392B"}}><font>Total price: ${parseFloat(item.price).toFixed(2)}</font></strong></p>
                            </div>
                            <div className="col-md-2">
                                <p>
                                    Number: {item.number}
                                </p>
                            </div>
                        </div>
                        }
                        <div className={classes.detailBox} id={"detail"+item.recipeId} style={{display: "none"}}>
                            <hr style={{marginBottom:"0px"}}/>
                            {recipeDetail}
                            <br/>
                        </div>
                    </div>
                )
            });
        }
        return (
            <div className={this.props.displayClass} id="nav-shoppingCart" role="tabpanel" aria-labelledby="nav-shoppingCart-tab" style={this.props.style}> 
                {this.state.loading?
                    <Spinner/>:
                        <div className={classes.shoppingCart}>
                            {recipes}
                            {!this.props.notShow && !(this.state.recipes.length == 0)?
                                <Link to='/placeOrder' className="btn btn-default btn-primary" id={classes.checkOut}>CheckOut</Link>:
                                <div></div>
                            }
                        </div>
                }
                <br/>
                <br/>
            </div> 
                
        );
    }
}
const mapStateToProps = state =>{
    return{
        userId: localStorage.getItem("uid"),
        token: localStorage.getItem("token")
    }
}
export default connect(mapStateToProps, null)(shoppingcart);