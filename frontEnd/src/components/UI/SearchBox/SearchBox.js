import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchRecipe } from '../../../store/actions/search';
import classes from './SearchBox.css';

class SearchBox extends Component {

    constructor(props) {
        super(props);
        this.state = { keyword: this.props.keyword };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleInputChange(event) {
        this.setState({ keyword: event.target.value });
    }

    handleSearch(event) {
        this.props.onSearch(this.state.keyword);
    }

    render() {
        return(
            <div className="input-group" style={this.props.searchBoxStyle}>
                <input type="text" className="form-control" placeholder={this.props.placeHolder} 
                    value={this.state.keyword} onChange={this.handleInputChange}/>
                <div className="input-group-append">
                    <Link to="/search">
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
        keyword: state.search
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: (keyword) => {
            dispatch(searchRecipe(keyword))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
