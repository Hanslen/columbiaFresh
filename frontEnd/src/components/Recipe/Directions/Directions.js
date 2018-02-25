import React from 'react';
import { Link } from 'react-router-dom';

class directions extends React.Component{
    render(){
        let range = [1, 2, 3, 4, 5];
        let liClasses = ["list-group-item", "borderless"];
        let listItems = range.map(i => 
            <li key={i} className={liClasses.join(' ')}>
                Direction
            </li>
        );
        return (
            <div>
                <h3>Directions</h3>
                <hr />
                <ul className="list-group list-group-flush">{listItems}</ul>
            </div>
        );
    }
}

export default directions;
