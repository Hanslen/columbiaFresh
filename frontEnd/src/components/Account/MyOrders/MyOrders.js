import React, { Component } from 'react';
import MyHeader from '../MyHeader/MyHeader';
import classes from './MyOrder.css';
import { Link } from 'react-router-dom';
class myorders extends Component{
    state = {
        myFolders:["Delivered", "Dispatching", "Preparing","Cancelled"],
        orders: [{
            orderdate: "January 13, 2018",
            deliverdate: "Jan 17, 2018",
            price: "10.79",
            shipTo: "Teacher",
            orderId: "1129051",
            title: "Quaker Instant Oatmeal Variety Pack",
            soldBy: "Amazon.com Services, Inc.",
            src: "/static/img/order.jpg"
        },
        {
            orderdate: "January 13, 2018",
            deliverdate: "Jan 17, 2018",
            price: "10.79",
            shipTo: "Teacher",
            orderId: "1129052",
            title: "Quaker Instant Oatmeal Variety Pack",
            soldBy: "Amazon.com Services, Inc.",
            src: "/static/img/order.jpg"
        },
        {
            orderdate: "January 13, 2018",
            deliverdate: "Jan 17, 2018",
            price: "10.79",
            shipTo: "Teacher",
            orderId: "1129053",
            title: "Quaker Instant Oatmeal Variety Pack",
            soldBy: "Amazon.com Services, Inc.",
            src: "/static/img/order.jpg"
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
        let orders = this.state.orders.map(order => {
            let orderUrl = "/myorder/"+order.orderId;
            return(
            <div key={order.orderId}>
                <div className={classes.folderContent}>
                    <div className="row" style={{marginLeft:"0px",marginRight:"0px",backgroundColor:"#eee",border: "1px solid #dcdcdc"}}>
                        <div className="col-md-3">
                            <p className={classes.orderSubTitle}>ORDER PLACED<br/>
                            <strong>{this.state.orders[0].orderdate}</strong></p>
                        </div>
                        <div className="col-md-3">
                             <p className={classes.orderSubTitle}>TOTAL<br/>
                             <strong>${this.state.orders[0].price}</strong></p>
                        </div>
                        <div className="col-md-3">
                             <p className={classes.orderSubTitle}>SHIPTO<br/>
                             <strong>{this.state.orders[0].shipTo}</strong></p>
                         </div>
                         <div className="col-md-3">
                             <p className={classes.orderSubTitle}>ORDER ID<br/>
                             <strong>#{this.state.orders[0].orderId}</strong></p>
                        </div>
                    </div>
                    <div className="row" style={{marginLeft:"0px",marginRight:"0px", paddingLeft:"20px", border: "1px solid #dcdcdc"}}>
                         <div className="col-md-9">
                             <h6 className={classes.subStatus}><strong>Delivered {this.state.orders[0].deliverdate}</strong></h6>
                            <div className={classes.orderSubLeft}>
                                <img src={this.state.orders[0].src}/>
                                 <div className={classes.description}>
                                    <Link to={orderUrl}><strong>{this.state.orders[0].title}</strong></Link>
                                    <p>Sold by: {this.state.orders[0].soldBy}</p>
                                    <p>${this.state.orders[0].price}</p>
                                 </div>
                            </div>
                         </div>
                        <div className="col-md-3">
                            <div className={classes.orderBtn}>
                                <Link to={orderUrl}><button className="btn btn-default btn-primary">Order details</button></Link>
                                {/* <button className="btn btn-default btn-primary">Track Package</button> */}
                                 {/* <button className="btn btn-default btn-primary">Write a product review</button> */}
                             </div>
                        </div>
                     </div>
                </div>

                <div style={{height: "10px", backgroundColor:"rgb(244,245,247)", border:"none"}}></div>
            </div>
        )});
        return (
            <div className="tab-pane fade active show" id="nav-myOrder" role="tabpanel" aria-labelledby="nav-myOrder-tab">
                <div className="row">
                    <div className="col-3">
                        <div className="list-group" id="list-tab" role="tablist">
                        {folders}   
                        </div>
                    </div>
                    <div className="col-9">
                        {orders}
                    </div>
                </div>
                <br/>
            </div>
            
        );
    }
}
export default myorders;