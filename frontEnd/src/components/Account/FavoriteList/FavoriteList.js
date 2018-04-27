import React, { Component } from 'react';
import MyHeader from '../MyHeader/MyHeader';
import classes from './Favorite.css';
import {Link, withRouter} from 'react-router-dom';
import Axios from '../../../axios-config';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
class favoritelist extends Component{
    state = {
        myFolders: ["My Likes"],
        // myFolders:["ChineseFood", "Burger", "Taco","KoreanFood", "Soup", "Snacks"],
        selectedFolder: "ChineseFood",
        items: [{
            id: 1,
            title: "Porridgeeeeeeeeeeeeeeeeeeeee",
            src: "/static/img/breakfast.png"
        }],
        userId: null
    }
    componentWillMount(){
        const pathName = this.props.history.location.pathname;
        const urlSplit = pathName.split('/');

        let postUserId = this.props.userId;
        if(urlSplit.length == 3){
            postUserId = urlSplit[2];
            this.setState({userId:urlSplit[2]});
        }
        const postData= {
            userId: postUserId,
            token: this.props.token
        }
        Axios.post("/getfavouritelist", postData).then(response => {
            this.setState({items: response.data});
        }).catch(error => {
            this.props.setAlert("Connection Failed", true);
        });
    }
    activeHandler = (folder) => {
        for(var f in this.state.myFolders){
            $('#'+this.state.myFolders[f]).removeClass(classes.folderactive);
        }
        $('#'+folder).addClass(classes.folderactive);
        this.setState({selectedFolder:folder});
    }
    render(){

        let folderCss = ["fas", "fa-folder-open",classes.folderIcon];
        let folderA = ["list-group-item", classes.foldera];
        let folders = this.state.myFolders.map((folder,id) => {
            if(id == 0){
                return(<a className={folderA.concat(classes.folderactive).join(" ")} key={folder} onClick={(id)=>this.activeHandler(folder)} id={folder}><i className={folderCss.join(" ")}></i>{folder}</a>);
            }
            else{
                return(<a className={folderA.join(" ")} key={folder} onClick={(id)=>this.activeHandler(folder)} id={folder}><i className={folderCss.join(" ")}></i>{folder}</a>);
            }
                
        });
        let items = this.state.items.map(item => {
            let imgUrl = "url("+item.src+")";
            let linkUrl = "/recipe/"+item.id;
            return(
                <Link to={linkUrl} key={item.id}>
                <div className={classes.borderBox}>
                    <div className={classes.folderItem} style={{backgroundImage:imgUrl}}>
                    </div>
                    <div className={classes.subFolder}>
                        <p>{item.title}</p>
                    </div>
                </div></Link>);
        });
        return (
            <div className="tab-pane fade" id="nav-favoriteList" role="tabpanel" aria-labelledby="nav-favoriteList-tab">
                <div className="row">
                    <div className="col-3">
                        <div className="list-group" id="list-tab" role="tablist">
                            {folders}
                         </div>
                    </div>
                    <div className="col-9">
                        <div className={classes.folderContent}>
                            {items}
                            
                            {/* <button className="btn btn-default btn-primary" id={classes.loadMoreBtn}>Next Page</button> */}
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return{
        userId: localStorage.getItem("uid"),
        token: localStorage.getItem("token")
    }};
const mapDispatchToProps = dispatch => {
    return{
        setAlert: (error, isError) => dispatch(actions.setAlert(error, isError))
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(favoritelist));