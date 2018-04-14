import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../../../axios-config';
import { setAlert } from '../../../store/actions/index';

class Ingredients extends React.Component {

    constructor(props) {
        super(props);
        this.state = { message: '' };
        
        this.handleAdd = this.handleAdd.bind(this);
        this.viewCart = this.viewCart.bind(this);
    }

    handleAdd() {
        if (!this.props.token) {
            this.props.setAlert("Please log in first", true);
            return;
        }
        let saveMsg = (message) => this.setState({
            message: 'add successfully!'
        });
        axios.post('/addToCart', {
            token: this.props.token,
            uid: this.props.uid,
            rid: this.props.rid
        }).then(function (response) {
            console.log(response);
            saveMsg(response.data.message);
        }).catch(function (error) {
            console.log(error);
        });
    }

    viewCart() {
        this.props.history.push("/myprofile#shoppingcart");
    }

    render() {
        let liClasses = ["list-group-item", "borderless"];
        let listItems = this.props.items.map((ingredient, i) => 
            <li key={i} className={liClasses.join(' ')}>
                <span>{ingredient.quantity} </span>
                <span>{ingredient.name}</span>
            </li>
        );

        let modal = (
            <div className="modal fade" id="addToCartModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            {this.state.message}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Continue browsing</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.viewCart}>View shopping cart</button>
                        </div>
                    </div>
                </div>
            </div>
        );
        let target = this.props.token ? "#addToCartModal" : "#";
        return (
            <div className="mt-3">
                <div className="row">
                    <div className="col-9">
                        <h3>Ingredients</h3>
                    </div>
                    <div className="col-3">
                        <div className="pos-bottom">
                            <i className="fas fa-balance-scale"></i>
                            <span> {this.props.calorie} cal</span>
                        </div>
                    </div>
                </div>
                <hr className="mt-1 mb-1"/>
                <ul className="list-group list-group-flush">{listItems}</ul>
                <button className="btn btn-info float-right" 
                    data-toggle="modal" data-target={target}
                    onClick={this.handleAdd} >
                    Add to cart
                </button>
                {modal}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.auth.userId,
        token: state.auth.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAlert: (error, isError) => {
            dispatch(setAlert(error, isError))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Ingredients));
