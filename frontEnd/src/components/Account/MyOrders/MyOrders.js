import React, { Component } from 'react';
import MyHeader from '../MyHeader/MyHeader';
class myorders extends Component{
    render(){
        return (
            <div className="tab-pane fade show active" id="nav-myOrder" role="tabpanel" aria-labelledby="nav-myOrder-tab">
                <div className="row">
                    <div className="col-3">
                        <div className="list-group" id="list-tab" role="tablist">
                            <a className="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">Home</a>
                            <a className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Profile</a>
                            <a className="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Messages</a>
                            <a className="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">Settings</a>
                         </div>
                    </div>
                    <div className="col-9">
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">A</div>
                            <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">B</div>
                            <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">C</div>
                            <div className="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">D</div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}
export default myorders;