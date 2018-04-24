import React from 'react';
import { Link } from 'react-router-dom';

class Directions extends React.Component{
    render() {
        let liClasses = ["media", "direction-list"];
        let listItems = this.props.items.map((step, i) => 
            <li key={i+1} className={liClasses.join(' ')}>
                <div className="direction-num">{i+1}</div>
                <div className="media-body">
                    <p>{step}</p>
                </div>
            </li>
        );
        return (
            <div className="mt-5">
                <div className="row">
                    <div className="col-9">
                        <h3>Directions</h3>
                    </div>
                    {/*
                    <div className="col-3">
                        <div className="pos-bottom">
                            <i className="far fa-clock"></i>
                            <span> {this.props.preptime} m</span>
                        </div>
                    </div>
                    */}
                </div>
                <hr className="mt-1 mb-1"/>
                <ul className="list-group">{listItems}</ul>
            </div>
        );
    }
}

export default Directions;
