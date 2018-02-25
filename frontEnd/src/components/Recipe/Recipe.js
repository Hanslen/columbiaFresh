import React from 'react';
import { Link } from 'react-router-dom';
import Ingredients from './Ingredients/Ingredients';
import Directions from './Directions/Directions';
import Reservation from '../Reservation/Reservation';

class recipe extends React.Component{
    render(){
        let item = {
            title: "title"
        }
        return (
            <div className="container">
                <div className="row standard-blank">
                    level 1 > level 2 > level 3
                </div>
                <div className="row mt-3">
                    <div className="col-8">
                        <h1>{item.title}</h1>
                        <img src="http://via.placeholder.com/600x400"/>
                        <Ingredients />
                        <Directions />
                    </div>
                    <div className="col-4">
                        <Reservation />
                    </div>
                </div>
            </div>
        );
    }
}

export default recipe;
