import React, { Component } from 'react';
import MyHeader from '../MyHeader/MyHeader';
import classes from './Favorite.css';
class favoritelist extends Component{
    state = {
        myFolders:["ChineseFood", "Burger", "Taco","KoreanFood", "Soup", "Snacks"],
        selectedFolder: "ChineseFood",
        items: [{
            id: 1,
            title: "Porridge",
            src: "/static/img/breakfast.png"
        },
        {
            id: 2,
            title: "Spicy Porridge",
            src: "/static/img/breakfast.png"
        },
        {
            id: 3,
            title: "Amazing burger",
            src: "/static/img/burger.png"
        },
        {
            id: 4,
            title: "Very Delicious Porridge",
            src: "/static/img/breakfast.png"
        },
        {
            id: 5,
            title: "BBQ",
            src: "/static/img/bbq2.png"
        },
        {
            id: 6,
            title: "Vegetable wrap",
            src: "/static/img/wrap2.png"
        },
        {
            id: 7,
            title: "Roasted platter",
            src: "/static/img/lunch.png"
        },
        {
            id: 8,
            title: "Cheese Sandwich",
            src: "/static/img/test.png"
        }]
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
            return(
            <div className={classes.folderItem} key={item.id} style={{backgroundImage:imgUrl}}>
                <p>{item.title}</p>
            </div>);
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
                            <button className="btn btn-default btn-primary" id={classes.loadMoreBtn}>Next Page</button>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}
export default favoritelist;