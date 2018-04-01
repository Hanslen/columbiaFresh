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
        tags: ['tag1'],
        authorURL: "",
        author: "Author",
        avatar: "http://via.placeholder.com/40x40",
        ingredients: null,
        notes: "",
        intro: ""
    }
  
    componentWillMount(){
        this.setState({ingredients: this.props.ingredients});
    }
    uploadImg = () => {
        $('#uploadImg').trigger('click');;
    }
    addIngredients = () => {
        this.props.addIngredients();
    }
    listenIngChange = () => {
        this.setState({ingredients: this.props.ingredients});
    }
    uploadRecipe = () => {
        console.log(this.state.title);
        console.log(this.state.tags);
        console.log(this.state.intro);
        console.log(this.state.ingredients);
        console.log(this.props.directions);
        console.log(this.state.notes);
    }
    addTag = (e) => {
        if (e.key === 'Enter') {
            let oldState = this.state.tags;
            oldState.push(e.target.value);
            this.setState({tags: oldState});
            e.target.value="";
        }
    }
    deleteTag = (tag) => {
        console.log(tag);
        let oldState = this.state.tags;
        let id = oldState.indexOf(tag);
        oldState.splice(id, 1);
        this.setState({tags: oldState});
    }
    updateNotes = (e) => {

        let oldState = this.state.notes;
        oldState = e.target.value;
        this.setState({notes: oldState});
    }
    updateTitle = (e) => {
        let oldState = this.state.title;
        oldState = e.target.value;
        this.setState({title: oldState});
    }
    updateIntro = (e) => {
        let oldState = this.state.intro;
        oldState = e.target.value;
        this.setState({intro: oldState});
    }
    render(){
        let liClasses = ["list-group-item", "borderless"];
        let tagItems = this.state.tags.map(tag => {
            let tagURL = "/search?"+tag;
            return (
                    <span key={tag} className="tag" onClick={() => this.deleteTag(tag)}>
                        {tag}
                    </span>
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
                        <input type="input" className="form-control" placeholder="Please enter your recipe title" onChange={(e) => this.updateTitle(e)} value={this.state.title}/>
                        <br/>
                        <img src={this.state.img} style={{width:"100%"}} onClick={this.uploadImg}/>
                        <input type="file" id="uploadImg" style={{display:"none"}}/>
                        <br/><br/>
                        {tagItems} 
                            <input type="text" className="addTag" id="addTag" onKeyPress={this.addTag}/>
                        {authorInfo}
                        <textarea className="form-control" placeholder="Please enter recipe description." value={this.state.intro} onChange={(e) => this.updateIntro(e)}/>
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
                            <textarea className="form-control" value={this.state.notes} placeholder="What you want to tell more?" onChange={(e) => this.updateNotes(e)}/>
                        </div>
                        <br/>
                        <div className="mt-3">
                            <div className="list-group">
                                <Button btnValue="Submit" onClick={this.uploadRecipe}/>
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
        ingredients: state.addRecip.ingredients,
        directions: state.addRecip.directions
    };
}
const mapDispatchToProps = dispatch => {
    return {
        addIngredients: (ing) => dispatch(actions.addIngredients(ing))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(createRecipe);