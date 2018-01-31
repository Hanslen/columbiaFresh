import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './SearchBox.css';

class searchBox extends Component{
    render(){
        return(
            <div className="input-group" style={this.props.searchBoxStyle}>
        <input type="text" className="form-control" placeHolder={this.props.placeHolder}/>
        <div className="input-group-append">
            <Link to="/search"><button type="button" className="btn btn-primary" id={this.props.btnStyle}>Search</button></Link>
        </div>
    </div>
        );
    }
};

export default searchBox;