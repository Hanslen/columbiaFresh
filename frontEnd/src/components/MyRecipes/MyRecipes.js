import React, {Component} from 'react';
import classes from './MyRecipes.css';
import Button from '../UI/Button/Button';
import { Link, withRouter } from 'react-router-dom';
import Axios from '../../axios-config';
import {connect} from 'react-redux';
import { stat } from 'fs';
import Spinner from '../UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
class myRecipes extends Component{
    state= {
        loading: true,
        myFolders:["+ Create a recipe"],
        selectedFolder: "ChineseFood",        
        items: [{
            id: 1,
            title: "Burger:P",
            src: "/static/img/burger.png"
        }],
        userId: null
    }
    componentDidMount(){
        const pathName = this.props.history.location.pathname;
        const urlSplit = pathName.split('/');
        console.log(urlSplit);
        let postUserId = this.props.userId;
        if(urlSplit.length == 3){
            postUserId = urlSplit[2];
            this.setState({userId: urlSplit[2]});
        }
        const postData = {
            userId: postUserId,
            token: this.props.token
        }
        Axios.post("/myrecipe/tags", postData).then(response=>{
            let updateFolder = response.data.tags;
            updateFolder.push("+ Create a recipe");
            this.setState({myFolders: updateFolder});
            const postTagData = {
                userId: postUserId,
                token: this.props.token,
                tag: updateFolder[0]
            };
            Axios.post("/myrecipe/folder", postTagData).then(response=>{
                this.setState({items: response.data, loading: false});

            }).catch(error => {

            })
        }).catch(error => {
            console.log(error.response);
        });
    }
    activeHandler = (folder) => {
        for(var f in this.state.myFolders){
            $('#my'+this.state.myFolders[f]).removeClass(classes.folderactive);
        }
        const postData = {
            userId: this.props.userId,
            token: this.props.token,
            tag: folder
        };
        console.log(postData);
        Axios.post("/myrecipe/folder", postData).then(response=>{
            console.log(response.data);
            this.setState({items: response.data});
        }).catch(error => {
            console.log(error);
        });
        $('#my'+folder).addClass(classes.folderactive);
        this.setState({selectedFolder:folder});
    }
    
    deleteRecipe = (id) =>{
        console.log(id);
        const postData = {
            token: this.props.token,
            rid: id
        };
        Axios.post('/deleteRecipe', postData).then(response=>{
            // console.log(response);
            const postTagData = {
                userId: this.props.userId,
                token: this.props.token,
                tag: this.state.selectedFolder
            };
            Axios.post("/myrecipe/folder", postTagData).then(response=>{
                this.setState({items: response.data, loading: false});
                this.props.setAlert("You have delete the recipe successfully!",false);
            }).catch(error => {
                this.props.setAlert("You have delete the recipe successfully!",true);
            })
        }).catch(error =>{
            this.props.setAlert("You have delete the recipe successfully!",true);
        });
    }



    render(){
        let folderCss = ["fas", "fa-folder-open",classes.folderIcon];
        let folderA = ["list-group-item", classes.foldera];
        let folders = this.state.myFolders.map((folder,id) => {
            if(id == 0 && this.state.myFolders.length != 1){
                return(<a className={folderA.concat(classes.folderactive).join(" ")} key={folder} onClick={(id)=>this.activeHandler(folder)} id={"my"+folder}><i className={folderCss.join(" ")}></i>{folder}</a>);
            }
            else if(id == this.state.myFolders.length-1){
                return(<Link to="/createRecipe" style={{textDecoration:"none"}} className={folderA.join(" ")} key={folder} id={"my"+folder}>{folder}</Link>);
            }
            else{
                return(<a className={folderA.join(" ")} key={folder} onClick={(id)=>this.activeHandler(folder)} id={"my"+folder}><i className={folderCss.join(" ")}></i>{folder}</a>);
            }
                
        });
        // let recipes = this.state.items.map((item,id) => (
        //     <div className={classes.item} key={id}>
        //     <div className="row">
        //         <div className="col-md-8" onClick={() => this.showDetailHandler(item.id)}>
        //             <img src={item.src}/>
        //             <a href="#"><strong>{item.title}</strong></a>
        //         </div>
        //         <div className="col-md-1">
        //         </div>
        //         <div className="col-md-1">
        //         </div>
        //         <div className="col-md-2">
        //             <p>Category</p>
        //         </div>
        //     </div>
        // </div>
        // ));
        let recipes = this.state.items.map(item => {
            let imgUrl = "url("+item.src+")";
            let linkUrl = "/recipe/"+item.id;
            return(
                <div key={item.id}>
                <div className={classes.borderBox}>
                <Link to={linkUrl}>
                    <div className={classes.folderItem} style={{backgroundImage:imgUrl}}>
                    </div>
                </Link>
                    <div className={classes.subFolder}>
                        <p>{item.title}</p>
                        {this.state.userId == null?
                            <div className={classes.deleteBtn}><i className="far fa-trash-alt" style={{"marginTop":"3px","marginRight":"2px"}} onClick={(id) => this.deleteRecipe(item.id)}></i></div>:
                            <div></div>
                        }
                        
                    </div>
                </div>
                </div>);
        });
        return (<div className={this.props.displayClass} id="nav-myRecipes" role="tabpanel" aria-labelledby="nav-myRecipes-tab">
            {this.state.loading?
            <Spinner/>:
            <div>
            <div className="row">
                <div className="col-3">
                    <div className="list-group" id="list-tab" role="tablist">
                        {folders}
                     </div>
                </div>
                <div className="col-9">
                    <div className={classes.folderContent}>
                        {recipes}
                    </div>
                </div>
            </div>
            <br/>
        </div>
        }
            </div>
        );
    }
}
const mapStateToPros = state => {
    return {
        userId: localStorage.getItem("uid"),
        token: localStorage.getItem("token")
    }
};
const mapDispatchToProps = dispatch => {
    return{
        setAlert: (error, isError) => dispatch(actions.setAlert(error, isError))
    };
}
export default withRouter(connect(mapStateToPros, mapDispatchToProps)(myRecipes));