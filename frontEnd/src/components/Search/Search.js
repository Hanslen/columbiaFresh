import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from './Sidebar/Sidebar';
import SearchRes from './SearchRes/SearchRes';
import Reservation from '../Reservation/Reservation';

class Search extends React.Component{
    render() {
        let keyWord = this.props.keyword;
        return (
            <div className="container">
                <div className="row standard-blank">
                    <Link to="/"><span className="text-danger">home</span></Link>
                    <div className="ml-1 mr-1">></div>
                    <div><span className="text-secondary">{keyWord}</span></div>
                </div>
                <div className="row mt-3">
                    <div className="col-2">
                        <Sidebar />
                    </div>
                    <div className="col-6">
                        <h3>{keyWord}</h3>
                        <SearchRes />
                    </div>
                    <div className="col-4">
                        <Reservation />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        keyword: state.resultsReducer.keyword
    };
};

export default connect(mapStateToProps)(Search);
