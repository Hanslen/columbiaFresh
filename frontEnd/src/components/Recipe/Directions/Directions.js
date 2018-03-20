import React from 'react';
import { Link } from 'react-router-dom';

class Directions extends React.Component{
    render() {
        let range = [1, 2, 3, 4, 5];
        let liClasses = ["media", "direction-list"];
        let listItems = range.map(i => 
            <li key={i} className={liClasses.join(' ')}>
                <div className="direction-num">{i}</div>
                <div className="media-body">
                    <p>direction</p>
                </div>
            </li>
        );
        return (
            <div className="mt-5">
                <div className="row">
                    <div className="col-9">
                        <h3>Directions</h3>
                    </div>
                    <div className="col-3">
                        <div className="pos-bottom">
                            <i className="far fa-clock"></i>
                            <span> 90 m</span>
                        </div>
                    </div>
                </div>
                <hr />
                <ul className="list-group">{listItems}</ul>
            </div>
        );
    }
}

export default Directions;
