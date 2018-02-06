import React, { Component } from 'react';
import MyHeader from '../MyHeader/MyHeader';
import classes from '../Account.css';
class settings extends Component{
    render(){
        return (
            <div className="tab-pane fade" id="nav-settings" role="tabpanel" aria-labelledby="nav-settings-tab">
                <div className="row">
                    <div className="col-3">
                        <div className="list-group" id="list-tab" role="tablist">
                            <a className="list-group-item list-group-item-action AccountMenu active" id="list-basic-list" data-toggle="list" href="#list-basic" role="tab" aria-controls="list-basic" aria-selected="true">Basic Information</a>
                            <a className="list-group-item list-group-item-action AccountMenu" id="list-address-list" data-toggle="list" href="#list-address" role="tab" aria-controls="list-address" aria-selected="false">Address</a>
                            <a className="list-group-item list-group-item-action AccountMenu" id="list-creditCard-list" data-toggle="list" href="#list-creditCard" role="tab" aria-controls="list-creditCard" aria-selected="false">Credit Card</a>
                            <a className="list-group-item list-group-item-action AccountMenu" id="list-logOut-list" data-toggle="list" href="#list-logOut" role="tab" aria-controls="list-logOut" aria-selected="false">Log Out</a>
                         </div>
                    </div>
                    <div className="col-9">
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="list-basic" role="tabpanel" aria-labelledby="list-basic-list">
                                <form>
                                    
                                </form>
                            </div>
                            <div className="tab-pane fade" id="list-address" role="tabpanel" aria-labelledby="list-address-list">B</div>
                            <div className="tab-pane fade" id="list-creditCard" role="tabpanel" aria-labelledby="list-creditCard-list">C</div>
                            <div className="tab-pane fade" id="list-logOut" role="tabpanel" aria-labelledby="list-logOut-list">D</div>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
}
export default settings;