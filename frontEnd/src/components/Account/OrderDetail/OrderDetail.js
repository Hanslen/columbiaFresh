import React, { Component } from 'react';
import * as classes from './OrderDetail.css';
import Shoppingcart from '../ShoppingCart/ShoppingCart';
import { Link } from 'react-router-dom';
import Axios from '../../../axios-config';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
class orderDetail extends Component{
    state = {
        orderId: null,
        orders: []
    }
    componentWillMount(){
        let orderId = this.props.match.params.orderId;
        this.setState({orderId: this.props.match.params.orderId});
        const postData = {
            userId: this.props.userId,
            token: this.props.token,
            orderId: orderId
        };
        console.log(postData);
        Axios.post('/getorder', postData).then(response =>{
            console.log(response);
            this.setState({orders: response.data.msg});
        }).catch(error => {
            console.log(error);
            this.props.setAlert("Network error! Please check connection!", true);
            this.setState({orders: 1});
        });
    }
    componentDidMount(){
        

    }
    render(){
        return (
        <div className={classes.greyBg}>
            <br/>
            <div className={classes.orderHeader}>
                <h3>OrderID {this.state.orderId} <span className={classes.orderDate}>Feb 10th 2018</span></h3>
            </div>
            <Shoppingcart notShow={true} items={this.state.orders}/>
            <div className={classes.orderHeader}>
                <Link to="/myprofile"><button className="btn btn-default btn-primary" id={classes.backBtn}>Back</button></Link>
            </div>
            <br/><br/>
            <br/><br/>
        </div>);
    }
}
const mapStateToProps = state => {
    return{
        userId: localStorage.getItem("uid"),
        token: localStorage.getItem("token")
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setAlert: (error, isError) => dispatch(actions.setAlert(error, isError))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(orderDetail);