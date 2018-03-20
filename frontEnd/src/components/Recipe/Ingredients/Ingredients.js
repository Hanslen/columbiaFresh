import React from 'react';
import { Link } from 'react-router-dom';

class Ingredients extends React.Component{
    render() {
        let range = [1, 2, 3, 4, 5];
        let liClasses = ["list-group-item", "borderless"];
        let listItems = range.map(i => 
            <li key={i} className={liClasses.join(' ')}>
                Ingredient
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
                            <span> 150 cal</span>
                        </div>
                    </div>
                </div>
                <hr />
                <ul className="list-group list-group-flush">{listItems}</ul>
                <button className="btn btn-info float-right">Add to cart</button>
            </div>
        );
    }
}

export default Ingredients;
