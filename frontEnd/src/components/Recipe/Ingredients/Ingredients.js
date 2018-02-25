import React from 'react';
import { Link } from 'react-router-dom';

class ingredients extends React.Component{
    render(){
        let range = [1, 2, 3, 4, 5];
        let liClasses = ["list-group-item", "borderless"];
        let listItems = range.map(i => 
            <li key={i} className={liClasses.join(' ')}>
                Ingredient
            </li>
        );
        return (
            <div>
                <h3>Ingredients</h3>
                <hr />
                <ul className="list-group list-group-flush">{listItems}</ul>
                <button className="btn">Add to cart</button>
            </div>
        );
    }
}

export default ingredients;
