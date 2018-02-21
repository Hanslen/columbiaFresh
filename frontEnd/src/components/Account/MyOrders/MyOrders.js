import React, { Component } from 'react';
import MyHeader from '../MyHeader/MyHeader';
import classes from './MyOrder.css';
class myorders extends Component{
    state = {
        myFolders:["Delivered", "Dispatching", "Preparing","Cancelled"]
    }
    activeHandler = (folder) => {
        for(var f in this.state.myFolders){
            $('#'+this.state.myFolders[f]).removeClass(classes.folderactive);
        }
        $('#'+folder).addClass(classes.folderactive);
        this.setState({selectedFolder:folder});
    }
    render(){
        let folderCss = [["fas", "fa-check-circle",classes.folderIcon],["fas", "fa-arrow-alt-circle-up",classes.folderIcon],["fas", "fa-clock",classes.folderIcon],["fas", "fa-ban",classes.folderIcon]];
        let folderA = ["list-group-item", classes.foldera];
        let folders = this.state.myFolders.map((folder,id) => {
            if(id == 0){
                return(<a className={folderA.concat(classes.folderactive).join(" ")} key={folder} onClick={(id)=>this.activeHandler(folder)} id={folder}><i className={folderCss[id].join(" ")}></i>{folder}</a>);
            }
            else{
                return(<a className={folderA.join(" ")} key={folder} onClick={(id)=>this.activeHandler(folder)} id={folder}><i className={folderCss[id].join(" ")}></i>{folder}</a>);
            }
                
        });
        return (
            <div className="tab-pane fade show active" id="nav-myOrder" role="tabpanel" aria-labelledby="nav-myOrder-tab">
                <div className="row">
                    <div className="col-3">
                        <div className="list-group" id="list-tab" role="tablist">
                        {folders}   
                        </div>
                    </div>
                    <div className="col-9">
                        <div className={classes.folderContent}>
                            <button className="btn btn-default btn-primary" id={classes.loadMoreBtn}>More</button>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
            
        );
    }
}
export default myorders;