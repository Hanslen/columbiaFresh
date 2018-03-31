import React from 'react';
import axios from '../../axios-config';
import ShoppingCart from '../Account/ShoppingCart/ShoppingCart';

class Order extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            item: 100,
            shipping: 0,
            tax: 0,
            total: 100
        };
        
        this.handlePlace = this.handlePlace.bind(this);
    }

    componentDidMount() {
        axios.post('/', {
            // token: ,
            // uid: ,
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    handlePlace() {
        axios.post('/placeOrder', {
            // token: ,
            // uid: ,
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div style={{ width: '90%', margin: 'auto' }}>
                <br />
                <h3>Review your order</h3>
                <div className="row">
                    <div className="col-9">
                        <div className="borderBox">
                            <div className="row">
                                <div className="col-6">
                                    <h5>Shipping address</h5>
                                </div>
                                <div className="col-6">
                                    <h5>Payment method</h5>
                                </div>
                            </div>
                        </div>
                        <div className="borderBox">
                            <ShoppingCart />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="borderBox">
                            <button className="btn btn-warning center"
                                style={{ width: '80%' }}
                                onClick={this.handlePlace} >
                                Place your order
                            </button>
                            <br />
                            <h5 className="fontBold">Order Summary</h5>
                            <div>
                                <span>Items:</span>
                                <span className="float-right">{this.state.item}</span>
                            </div>
                            <div>
                                <span>Shipping &amp; handling:</span>
                                <span className="float-right">{this.state.shipping}</span>
                            </div>
                            <hr />
                            <div>
                                <span>Total before tax:</span>
                                <span className="float-right">{this.state.item+this.state.shipping}</span>
                            </div>
                            <div>
                                <span>Estimated tax to be collected:</span>
                                <span className="float-right">{this.state.tax}</span>
                            </div>
                            <hr />
                            <div className="fontBold" style={{ color: 'red', fontSize: 24+'px' }}>
                                <span>
                                    Order total:
                                </span>
                                <span className="float-right">{this.state.total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Order;
