import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../../axios-config';
import Ingredients from './Ingredients/Ingredients';
import Directions from './Directions/Directions';
import Reservation from '../Reservation/Reservation';
import Notes from './Notes/Notes';
import { searchKeyword, searchRecipes } from '../../store/actions/search';
import { setAlert } from '../../store/actions/index';

class Recipe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rid: this.props.match.params.token,
            title: 'title',
            img: 'http://via.placeholder.com/600x400',
            likes: 321,
            isLiked: false,
            tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
            aid: 123,
            avatar: 'http://via.placeholder.com/40x40',
            author: 'Author Name',
            description: 'say something',
            calorie: 150,
            preptime: 90,
            ingredients: [
                { name: 'ingredient1', quantity: '1' }, 
                { name: 'ingredient2', quantity: '2' }, 
                { name: 'ingredient3', quantity: '3' }, 
                { name: 'ingredient4', quantity: '4' }, 
                { name: 'ingredient5', quantity: '5' }
            ],
            directions: ['direction1', 'direction2', 'direction3', 'direction4', 'direction5'],
            notes: 'some notes...'
        }

        this.handleLike = this.handleLike.bind(this);
    }

    componentDidMount() {
        let rid = this.props.match.params.id;
        let saveRecipe = (data) => this.setState({
            rid: data.rid,
            title: data.title,
            img: data.img,
            likes: data.likes,
            isLiked: data.isLiked,
            tags: data.tags,
            aid: data.aid,
            avatar: data.avatar,
            author: data.author,
            description: data.description,
            calorie: data.calorie,
            preptime: data.preptime,
            ingredients: data.ingredients,
            directions: data.directions,
            notes: data.notes
        });
        console.log(rid);
        axios.post('/getRecipe', {
            token: this.props.token,
            uid: this.props.uid,
            rid
        }).then(function(response) {
            console.log(response);
            let data = response.data;
            saveRecipe(data);
        }).catch(function (error) {
            console.log(error);
        });
    }

    handleLike() {
        if (!this.props.token) {
            this.props.setAlert("Please log in first", true);
            return;
        }
        let saveLike = (likes, isLiked) => this.setState({
            likes,
            isLiked
        });
        axios.post('/likeRecipe', {
            token: this.props.token,
            uid: this.props.uid,
            rid: this.state.rid,
            like: this.state.isLiked
        }).then(function (response) {
            console.log(response);
            saveLike(response.data.likes, response.data.isLiked);
        }).catch(function (error) {
            console.log(error.response);
        });
    }

    handleSearch(keyword, e) {
        this.props.onSearch(keyword);
        this.props.onGetResults(keyword);
    }

    render() {
        let likeInfo = (
            <div className="row favorite">
                <div className="col-10 textlike">
                    <span className="text-danger">{this.state.likes}</span> likes
                </div>
                <div className="col-2">
                    <i className={this.state.isLiked ? "fas fa-heart like-icon" : "far fa-heart like-icon"} 
                        onClick={this.handleLike}></i>
                </div>
            </div>
        );

        let tagItems = this.state.tags.map(tag => {
            let tagURL = "/search?"+tag;
            return (
                <Link to={tagURL} key={tagURL} style={{"textDecoration": "none"}}>
                    <span key={tag} className="tag" 
                        onClick={(e) => this.handleSearch(tag, e)}>
                        {tag}
                    </span>
                </Link>
            );
        });

        let authorURL = "/user/"+this.state.aid;
        let authorInfo = (
            <div>
                <Link to={authorURL} style={{"textDecoration": "none"}}>
                    <div className="media mt-3 mb-2">
                        <img className="mr-3 rounded-circle" src={this.state.avatar} />
                        <div className="media-body" style={{lineHeight: 40+'px'}}>
                            {this.state.author}
                        </div>
                    </div>
                </Link>
                <p>
                    {this.state.description}
                </p>
            </div>
        );

        let searchURL = "/search?"+this.props.keyword;
        return (
            <div className="container">
                <div className="row standard-blank">
                    <Link to="/"><span className="text-danger">home</span></Link>
                    <div className="ml-1 mr-1">></div>
                    <Link to={searchURL}><span className="text-danger">{this.props.keyword}</span></Link>
                    <div className="ml-1 mr-1">></div>
                    <div><span className="text-secondary">{this.state.title}</span></div>
                </div>
                <div className="row mt-3">
                    <div className="col-8">
                        <h1>{this.state.title}</h1>
                        <img src={this.state.img} />

                        {likeInfo}
                        {tagItems}
                        {authorInfo}

                        <Ingredients rid={this.state.rid} 
                            calorie={this.state.calorie} 
                            items={this.state.ingredients} />
                        <Directions 
                            preptime={this.state.preptime} 
                            items={this.state.directions} />
                        <Notes notes={this.state.notes} />
                    </div>
                    <div className="col-4">
                        <Reservation />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        keyword: state.resultsReducer.keyword,
        uid: state.auth.userId,
        token: state.auth.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: (keyword) => {
            dispatch(searchKeyword(keyword))
        },
        onGetResults: (keyword) => {
            dispatch(searchRecipes(keyword))
        },
        setAlert: (error, isError) => {
            dispatch(setAlert(error, isError))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Recipe));
