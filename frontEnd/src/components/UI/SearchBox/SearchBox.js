import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../../../axios-config';
import { searchKeyword, searchPages, searchRecipes } from '../../../store/actions/search';
import classes from './SearchBox.css';

class SearchBox extends Component {

    constructor(props) {
        super(props);
        this.state = { keyword: '' };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleInputChange(event) {
        this.props.onSearch(event.target.value);
    }

    handleSearch(event) {
        let perPage = 10;
        this.props.onGetPages(this.props.keyword, perPage);
        this.props.onGetResults(this.props.keyword, 1, perPage);
    }

    render() {
        let searchURL = "/search?"+this.props.keyword;
        return (
            <div className="input-group" style={this.props.searchBoxStyle}>
                <input type="text" className="form-control" placeholder={this.props.placeHolder} 
                    value={this.props.keyword} onChange={this.handleInputChange}/>
                <div className="input-group-append">
                    <Link to={searchURL}>
                        <button type="button" className="btn btn-primary" id={this.props.btnStyle} 
                            onClick={this.handleSearch}>
                            Search
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        keyword: state.searchReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: (keyword) => {
            dispatch(searchKeyword(keyword))
        },
        onGetPages: (keyword, perPage) => {
            dispatch(searchPages(keyword, perPage))
        },
        onGetResults: (keyword, page, perPage) => {
            dispatch(searchRecipes(keyword, page, perPage))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBox));
