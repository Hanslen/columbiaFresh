import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../../axios-config';
import Ingredients from './Ingredients/Ingredients';
import Directions from './Directions/Directions';
import Reservation from '../Reservation/Reservation';
import Notes from './Notes/Notes';
import { searchRecipe } from '../../store/actions/search';

class Recipe extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            rid: 1,
            title: 'title',
            img: 'http://via.placeholder.com/600x400',
            tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
            uid: 123,
            avatar: 'http://via.placeholder.com/40x40',
            author: 'Author Name',
            discription: 'say something',
            calorie: 150,
            preptime: 90,
            ingredients: ['ingredient1', 'ingredient2', 'ingredient3', 'ingredient4', 'ingredient5'],
            directions: ['direction1', 'direction2', 'direction3', 'direction4', 'direction5'],
            notes: 'some notes...'
        }

        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        axios.post('/getRecipe', {
            recipeId: 1
        }).then(function(response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    handleSave() {
        axios.post('/saveRecipe', {
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

    handleSearch(keyword, e) {
        this.props.onSearch(keyword);
    }

    render() {
        let tagItems = this.state.tags.map(tag =>
            <span key={tag} className="tag" 
                onClick={(e) => this.handleSearch(tag, e)}>
                {tag}
            </span>
        )
        return (
            <div className="container">
                <div className="row standard-blank">
                    <Link to="/"><span className="text-danger">home</span></Link>
                    <div className="ml-1 mr-1">></div>
                    <Link to="/search"><span className="text-danger">search word</span></Link>
                    <div className="ml-1 mr-1">></div>
                    <div><span className="text-secondary">{this.state.title}</span></div>
                </div>
                <div className="row mt-3">
                    <div className="col-8">
                        <h1>{this.state.title}</h1>
                        <img src={this.state.img} />

                        <div className="row favorite">
                            <div className="col-10 textlike">
                                <span className="text-danger">3</span> likes
                            </div>
                            <div className="col-2">
                                <button className="btn btn-danger" onClick={this.handleSave}>like</button>
                            </div>
                        </div>

                        {tagItems}

                        <Link to='/user/123'>
                            <div className="media mt-3 mb-2">
                                <img className="mr-3 rounded-circle" src={this.state.avatar} />
                                <div className="media-body" style={{lineHeight: 40+'px'}}>
                                    {this.state.author}
                                </div>
                            </div>
                        </Link>
                        <p>
                            {this.state.discription}
                        </p>

                        <Ingredients calorie={this.state.calorie} items={this.state.ingredients}/>
                        <Directions preptime={this.state.preptime} items={this.state.directions}/>
                        <Notes notes={this.state.notes}/>
                    </div>
                    <div className="col-4">
                        <Reservation />
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: (keyword) => {
            dispatch(searchRecipe(keyword))
        }
    }
}

export default connect(null, mapDispatchToProps)(Recipe);
