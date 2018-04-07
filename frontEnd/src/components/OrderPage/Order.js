import React from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-config';
import ShoppingCart from '../Account/ShoppingCart/ShoppingCart';

class Order extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            firstname: 'abc',
            lastname: 'xyz',
            streetAddress1: '1600 Amphitheatre Parkway',
            streetAddress2: 'Apt',
            city: 'Mountain View',
            state_province_region: 'CA',
            zipCode: '94043',
            cardNumber: '1234567890123456',
            item: 10.99,
            shipping: 2,
            tax: 0,
            total: 12.99
        };
        
        this.handlePlace = this.handlePlace.bind(this);
    }

    componentDidMount() {
        let saveName = (firstname, lastname) => this.setState({ 
            firstname,
            lastname
        });
        axios.post('/settings/basic', {
            token: this.props.token,
            userId: this.props.uid
        }).then(function (response) {
            console.log(response);
            let data = response.data;
            saveName(data.firstname, data.lastname);
        }).catch(function (error) {
            console.log(error);
        });

        let saveAddr = (data) => this.setState({ 
            streetAddress1: data.streetAddress1,
            streetAddress2: data.streetAddress2,
            city: data.city,
            state_province_region: data.state_province_region,
            zipCode: data.zipCode
        });
        axios.post('/settings/address', {
            token: this.props.token,
            userId: this.props.uid
        }).then(function (response) {
            console.log(response);
            let data = response.data;
            saveAddr(data);
        }).catch(function (error) {
            console.log(error);
        });

        let saveCredit = (cardNumber) => this.setState({ cardNumber });
        axios.post('/settings/getcredit', {
            token: this.props.token,
            userId: this.props.uid
        }).then(function (response) {
            console.log(response);
            saveCredit(response.data.cardNumber);
        }).catch(function (error) {
            console.log(error);
        });
    }

    handlePlace() {
        axios.post('/placeOrder', {
            token: this.props.token,
            uid: this.props.uid
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
                                    <div>
                                        <span>{this.state.firstname} </span>
                                        <span>{this.state.lastname}</span>
                                    </div>
                                    <div>
                                        <span>{this.state.streetAddress1} </span>
                                        <span>{this.state.streetAddress2}</span>
                                    </div>
                                    <div>
                                        <span>{this.state.city}, </span>
                                        <span>{this.state.state_province_region} </span>
                                        <span>{this.state.zipCode}</span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h5>Payment method</h5>
                                    <div>
                                        <span className="mr-1">
                                            <i class="far fa-credit-card"></i>
                                        </span>
                                        <span> **** {this.state.cardNumber.slice(12)} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="borderBox">
                            <ShoppingCart displayClass="tab-pane fade active show" style={{marginLeft:"-15%",marginRight:"-15%"}}/>
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
                                <span className="float-right">${this.state.item}</span>
                            </div>
                            <div>
                                <span>Shipping &amp; handling:</span>
                                <span className="float-right">${this.state.shipping}</span>
                            </div>
                            <hr />
                            <div>
                                <span>Total before tax:</span>
                                <span className="float-right">${this.state.item+this.state.shipping}</span>
                            </div>
                            <div>
                                <span>Estimated tax to be collected:</span>
                                <span className="float-right">${this.state.tax}</span>
                            </div>
                            <hr />
                            <div className="fontBold totalSum">
                                <span>
                                    Order total:
                                </span>
                                <span className="float-right">${this.state.total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.auth.userId,
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(Order);
