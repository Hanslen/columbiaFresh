import React, {Component} from 'react';
import Input from '../UI/Input/Input';
import { Link, withRouter } from 'react-router-dom';
import classes from './createRecipe';
import Button from '../UI/Button/Button';
class createRecipe extends Component{
    state = {
        title: "",
        img:'http://via.placeholder.com/600x400',
        tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
        authorURL: "",
        author: "Author",
        avatar: "http://via.placeholder.com/40x40"

    }
    deleteIngredient = (id) => {
        console.log("delete ingredient");
    }   
    uploadImg = () => {
        $('#uploadImg').trigger('click');;
    }
    addMoreIngredient = () =>{
        console.log("Add more ingredients");
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
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item borderless">
                                        <input type="text" className="form-control addIngredients" placeholder="Ingredient"/>
                                        <input type="text" className="form-control addIngredients" placeholder="Quantity"/>
                                        <input type="text" className="form-control addIngredients" placeholder="Unit"/>
                                        <span style={{marginTop:"8px",float:"right"}} onClick={(id) => this.deleteIngredient(id)}>X</span>
                                    </li>
                                    <Button btnValue="Add more" style={{width:"30%"}} onClick={this.addMoreIngredient}/>
                                </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default createRecipe;