import React from 'react';
import { Link } from 'react-router-dom';
import Ingredients from './Ingredients/Ingredients';
import Directions from './Directions/Directions';
import Reservation from '../Reservation/Reservation';
import Notes from './Notes/Notes';

class Recipe extends React.Component{
    render() {
        let item = {
            title: "title"
        }
        let tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5']
        let tagItems = tags.map(tag =>
            <span key={tag} className="tag">{tag}</span>
        )
        return (
            <div className="container">
                <div className="row standard-blank">
                    level 1 > level 2 > level 3
                </div>
                <div className="row mt-3">
                    <div className="col-8">
                        <h1>{item.title}</h1>
                        <img src="http://via.placeholder.com/600x400"/>
                        <div className="row favorite">
                            <div className="col-10 textlike">
                                <span className="text-danger">3</span> likes
                            </div>
                            <div className="col-2">
                                <button className="btn btn-danger">like</button>
                            </div>
                        </div>
                        {tagItems}
                        <div className="media mt-3 mb-2">
                            <img className="mr-3 rounded-circle" src="http://via.placeholder.com/40x40" />
                            <div className="media-body" style={{lineHeight: 40+'px'}}>
                                User name
                            </div>
                        </div>
                        <p>
                            say something....
                        </p>
                        <Ingredients />
                        <Directions />
                        <Notes />
                    </div>
                    <div className="col-4">
                        <Reservation />
                    </div>
                </div>
            </div>
        );
    }
}

export default Recipe;
