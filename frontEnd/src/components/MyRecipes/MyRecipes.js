import React, {Component} from 'react';
import classes from './MyRecipes.css';
class myRecipes extends Component{
    state= {
        myFolders:["Breakfast", "Lunch", "Snacks","Dinner"],
        selectedFolder: "ChineseFood",        
        items: [{
            id: 1,
            title: "Burger:P",
            src: "/static/img/burger.png"
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
            $('#my'+this.state.myFolders[f]).removeClass(classes.folderactive);
        }
        $('#my'+folder).addClass(classes.folderactive);
        this.setState({selectedFolder:folder});
    }
    render(){
        let folderCss = ["fas", "fa-folder-open",classes.folderIcon];
        let folderA = ["list-group-item", classes.foldera];
        let folders = this.state.myFolders.map((folder,id) => {
            if(id == 0){
                return(<a className={folderA.concat(classes.folderactive).join(" ")} key={folder} onClick={(id)=>this.activeHandler(folder)} id={"my"+folder}><i className={folderCss.join(" ")}></i>{folder}</a>);
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
            return(
                <div key={item.id}>
                    <div className={classes.folderItem} style={{backgroundImage:imgUrl}}>
                    </div>
                    <div className={classes.subFolder}>
                        <p>{item.title}</p>
                    </div>
                </div>);
        });
        return (
            <div className="tab-pane fade" id="nav-myRecipes" role="tabpanel" aria-labelledby="nav-myRecipes-tab">
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
        );
    }
}
export default myRecipes;