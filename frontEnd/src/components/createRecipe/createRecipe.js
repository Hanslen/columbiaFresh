import React, {Component} from 'react';
import Input from '../UI/Input/Input';
import { Link, withRouter } from 'react-router-dom';
import classes from './createRecipe';
import Button from '../UI/Button/Button';
import IngredientBox from './uploadComponent/ingredientBox';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Directions from './uploadComponent/directions';
import Axios from '../../axios-config';
import AWS from 'aws-sdk';
import ReactS3 from 'react-s3';
class createRecipe extends Component{
    state = {
        title: "",
        img:'http://via.placeholder.com/600x400',
        tags: [],
        authorURL: "",
        author: "Author",
        avatar: "http://via.placeholder.com/40x40",
        ingredients: [["","",""]],
        notes: "",
        intro: "",
        selectedTags: []
    }
    componentWillMount(){
        console.log("load create recipe component");
        this.props.loadsuggestionIng();
        Axios.get("/getRecipeTags").then((res) => {
            this.setState({tags: res.data.tags});
        }).catch((err)=>{
            console.log(err);
        });
    }
    uploadImg = () => {
        $('#uploadImg').trigger('click');;

    }
    imgOnChange = (e) => {
        const file = this.refs.uploadImg.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState({img: reader.result})
        };
        if(file){
            reader.readAsDataURL(file);
            this.setState({img: reader.result});
        }
        else{
            this.setState({img:"http://via.placeholder.com/600x400"});
        }
    }
    addIngredients = () => {
        this.props.addIngredients();
    }
    listenIngChange = () => {
        this.setState({ingredients: this.props.ingredients});
    }
    addPhoto = () => {
        this.uploadRecipe("https://s3.amazonaws.com/uploadimgstore/shoppingcart.jpg");
        // var albumBucketName = 'uploadimgstore';
        // var bucketRegion = 'us-east-1';
        // var IdentityPoolId = 'us-east-1:e474abd9-e1ae-4f71-ab8e-1c781aa6c075';
        
        // AWS.config.update({
        //   region: bucketRegion,
        //   credentials: new AWS.CognitoIdentityCredentials({
        //     IdentityPoolId: IdentityPoolId
        //   })
        // });
        
        // var s3 = new AWS.S3({
        //   apiVersion: '2006-03-01',
        //   params: {Bucket: albumBucketName}
        // });
        // let files = document.getElementById('uploadImg').files;
        // if (!files.length) {
        //   return alert('Please choose a file to upload first.');
        // }
        // let file = files[0];
        // let fileName = file.name;
        // let albumPhotosKey = "";
        // let photoKey = albumPhotosKey + fileName;
        // let params=  {Bucket: albumBucketName, Key: photoKey, Body: file};
        // s3.upload(params, function(err, data){
        //     if(err){
        //         alert("Fail to upload img");
        //         console.log(err);
        //         return ;
        //     }
        //     else{
        //         console.log(data);
        //         this.uploadRecipe(data.Location);
        //         return ;
        //     }
        // });
      }
    uploadRecipe = (imgurl) => {
        this.props.uploadIng(this.props.token, this.state.title, imgurl, this.state.tags, this.props.userId, this.state.intro, this.state.ingredients, this.state.directions, this.state.notes);
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
        let oldState = this.state.selectedTags;
        let id = oldState.indexOf(tag);
        oldState.splice(id, 1);
        this.setState({selectedTags: oldState});
    }
    selectTag = (tag) => {
        let oldState = this.state.selectedTags;
        oldState.push(tag);
        this.setState({selectedTags: oldState});
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
            if(this.state.selectedTags.includes(tag)){
                return (
                    <span key={tag} className="selectedTag" onClick={() => this.deleteTag(tag)}>
                        {tag}
                    </span>
            );
            }
            else{
                return (
                    <span key={tag} className="unselectedTag" onClick={() => this.selectTag(tag)}>
                        {tag}
                    </span>
                );
            }
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
                <IngredientBox key={id} id={id} type={ing[0]} num={ing[1]} unit={ing[2]}/>
            );
        });
        if(!this.props.isAuthenticated){
            this.props.history.push('/');
        }
        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-8">
                        <input type="input" className="form-control" placeholder="Please enter your recipe title" onChange={(e) => this.updateTitle(e)} value={this.state.title}/>
                        <br/>
                        <img src={this.state.img} style={{width:"100%"}} onClick={this.uploadImg}/>
                        <input type="file" ref="uploadImg" name="selectedFile" onChange={this.imgOnChange} id="uploadImg" style={{display:"none"}}/>
                        <br/><br/>
                        {tagItems} 
                            {/* <input type="text" className="addTag" id="addTag" onKeyPress={this.addTag}/> */}
                        {authorInfo}
                        <textarea className="form-control" placeholder="Please enter recipe description." value={this.state.intro} onChange={(e) => this.updateIntro(e)}/>
                        <div className="mt-3">
                            <div className="row">
                                <div className="col-9">
                                    <h3>Ingredients</h3>
                                </div>
                            </div>
                            <hr className="mt-1 mb-1"/>
                                <ul className="list-group list-group-flush" id="ingredientList" onChange={this.listenIngChange} onClick={this.listenIngChange}>
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
                                <Button btnValue="Submit" onClick={this.addPhoto}/>
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
        directions: state.addRecip.directions,
        isAuthenticated: localStorage.getItem("email") != null,
        userId: state.auth.userId,
        token: state.auth.token
    };
}
const mapDispatchToProps = dispatch => {
    return {
        addIngredients: (ing) => dispatch(actions.addIngredients(ing)),
        uploadIng: (token, title, img, tag, authorId, description, ingredients, directions, notes) => dispatch(actions.uploadIng(token, title, img, tag, authorId, description, ingredients, directions, notes)),
        loadsuggestionIng: () => dispatch(actions.loadsuggestionIng())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(createRecipe));