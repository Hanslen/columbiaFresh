import React, {Component} from 'react';
import Input from '../UI/Input/Input';
import { Link, withRouter } from 'react-router-dom';
import classes from './createRecipe';
import Button from '../UI/Button/Button';
import IngredientBox from './uploadComponent/ingredientBox';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Directions from './uploadComponent/directions';
class createRecipe extends Component{
    state = {
        title: "",
        img:'http://via.placeholder.com/600x400',
        tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
        authorURL: "",
        author: "Author",
        avatar: "http://via.placeholder.com/40x40",
        ingredients: null
    }
  
    componentWillMount(){
        this.setState({ingredients: this.props.ingredients});
    }
    uploadImg = () => {
        $('#uploadImg').trigger('click');;
    }
    componentWillUpdate(nextPros){
    }
    addIngredients = () => {
        this.props.addIngredients();
    }
    listenIngChange = () => {
        this.setState({ingredients: this.props.ingredients});
    }
    render(){
        let liClasses = ["list-group-item", "borderless"];
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

        let authorInfo = (
            <div>
                <Link to={this.state.authorURL} style={{"textDecoration": "none"}}>
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

        let ingredients = this.state.ingredients.map((ing,id) => {
            return (
                <IngredientBox key={id} id={id}/>
            );
        });
        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-8">
                        <Input elementType="input" placeholder="Please enter your recipe title"/>
                        <img src={this.state.img} style={{width:"100%"}} onClick={this.uploadImg}/>
                        <input type="file" id="uploadImg" style={{display:"none"}}/>
                        <br/><br/>
                        {tagItems}  
                        {authorInfo}
                        <Input elementType="textarea" elementConfig={{placeholder:"Please enter recipe description."}} boxStyle={{marginTop:"-5%"}}/>
                        <div className="mt-3">
                            <div className="row">
                                <div className="col-9">
                                    <h3>Ingredients</h3>
                                </div>
                            </div>
                            <hr className="mt-1 mb-1"/>
                                <ul className="list-group list-group-flush" id="ingredientList" onClick={this.listenIngChange}>
                                    {ingredients}
                                    <Button btnValue="Add more" style={{width:"30%"}} onClick={this.addIngredients}/>
                                </ul>
                        </div>
                        <Directions/>
                        <div>
                            <h4>Notes</h4>
                            <hr className="mt-1 mb-2"/>
                            <textarea class="form-control" placeholder="What you want to tell more?"/>
                        </div>
                        <br/>
                        <div className="mt-3">
                            <div className="list-group">
                                <Button btnValue="Submit"/>
                                </div>
                        </div>
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        ingredients: state.addRecip.ingredients
    };
}
const mapDispatchToProps = dispatch => {
    return {
        addIngredients: (ing) => dispatch(actions.addIngredients(ing))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(createRecipe);