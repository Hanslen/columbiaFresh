import React, { Component } from 'react';
import MyHeader from '../MyHeader/MyHeader';
import classes from './MyOrder.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from '../../../axios-config';
import Spinner from '../../UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import EmptyBox from '../EmptyBox/EmptyBox';
class myorders extends Component{
    state = {
        loading: true,
        myFolders:["Delivered", "Dispatching", "Preparing","Cancelled"],
        orders: []
    }
    componentWillMount(){
        // console.log("Order will mount"+this.props.userId+" "+this.props.token);
        const postData = {userId: this.props.userId, token: this.props.token};
        // console.log(postData);
        Axios.post("/orders", postData).then(response => {
            this.setState({orders: response.data.msg, loading: false})
        }).catch(err => {
            console.log(err);
            this.props.setAlert("Please connect to network, then I can get your orders!", true);
            this.setState({loading:false});
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
            let orderUrl = "/myorder/"+order.orderID;
            return(
            <div key={order.orderID}>
                <div className={classes.folderContent}>
                    <div className="row" style={{marginLeft:"0px",marginRight:"0px",backgroundColor:"#eee",border: "1px solid #dcdcdc"}}>
                        <div className="col-md-3">
                            <p className={classes.orderSubTitle}>ORDER PLACED<br/>
                            <strong>{this.state.orders[0].orderPlaceDate}</strong></p>
                        </div>
                        <div className="col-md-3">
                             <p className={classes.orderSubTitle}>TOTAL<br/>
                             <strong>${this.state.orders[0].totalPrice}</strong></p>
                        </div>
                        <div className="col-md-3">
                             <p className={classes.orderSubTitle}>SHIPTO<br/>
                             <strong>{this.state.orders[0].shipTo}</strong></p>
                         </div>
                         <div className="col-md-3">
                             <p className={classes.orderSubTitle}>ORDER ID<br/>
                             <strong>#{this.state.orders[0].orderID}</strong></p>
                        </div>
                    </div>
                    <div className="row" style={{marginLeft:"0px",marginRight:"0px", paddingLeft:"20px", border: "1px solid #dcdcdc"}}>
                         <div className="col-md-9">
                             <h6 className={classes.subStatus}><strong>Delivered {this.state.orders[0].deliveredDate}</strong></h6>
                            <div className={classes.orderSubLeft}>
                                <img src={this.state.orders[0].img}/>
                                 <div className={classes.description}>
                                    <Link to={orderUrl}><strong>{this.state.orders[0].title}</strong></Link>
                                    <p>Sold by: {this.state.orders[0].soldBy}</p>
                                    <p>${this.state.orders[0].totalPrice}</p>
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
                    {this.state.loading?
                        <Spinner/>:
                        this.state.orders.length ==0?
                        <div>
                            <br/><br/>
                            <EmptyBox msg="Empty orders found..."/>
                        </div>:
                        orders
                    }
                    </div>
                </div>
                <br/>
            </div>
            
        );
    }
}
const mapStateToProps = state => {
    return {
        userId: localStorage.getItem("uid"),
        token: localStorage.getItem("token")
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setAlert: (error, isError) => dispatch(actions.setAlert(error, isError))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(myorders);