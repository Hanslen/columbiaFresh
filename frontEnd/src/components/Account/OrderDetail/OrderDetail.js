import React, { Component } from 'react';
import * as classes from './OrderDetail.css';
import Shoppingcart from '../ShoppingCart/ShoppingCart';
import { Link } from 'react-router-dom';
class orderDetail extends Component{
    state = {
        orderId: null
    }
    componentWillMount(){
        let orderId = this.props.match.params.orderId;
        this.setState({orderId: this.props.match.params.orderId});
    }
    componentDidMount(){
        console.log(this.state.orderId);
    }
    render(){
        return (
        <div>
            <br/>
            <div className={classes.orderHeader}>
                <h3>OrderID {this.state.orderId} <span className={classes.orderDate}>Feb 10th 2018</span></h3>
            </div>
            <Shoppingcart notShow={true}/>
            <div className={classes.orderHeader}>
                <Link to="/myprofile"><button className="btn btn-default btn-primary" id={classes.backBtn}>Back</button></Link>
            </div>
            <br/><br/>
            <br/><br/>
        </div>);
    }
}
export default orderDetail;