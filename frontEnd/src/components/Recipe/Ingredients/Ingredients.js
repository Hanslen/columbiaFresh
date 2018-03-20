import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../axios-config';

class Ingredients extends React.Component{

    constructor(props) {
        super(props);
        
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd() {
        axios.post('/addToCart', {
            firstName: 'Fred',
            lastName: 'Flintstone'
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
        this.setState({

        });
    }

    render() {
        let liClasses = ["list-group-item", "borderless"];
        let listItems = this.props.items.map((ingredient, i) => 
            <li key={i} className={liClasses.join(' ')}>
                {ingredient}
            </li>
        );
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
                <hr />
                <ul className="list-group list-group-flush">{listItems}</ul>
                <button className="btn btn-info float-right" onClick={this.handleAdd} >Add to cart</button>
            </div>
        );
    }
}

export default Ingredients;
