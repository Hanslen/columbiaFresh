import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchKeyword, searchPages, rankRecipes } from '../../store/actions/search';

class Reservation extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let perPage = 10;
        this.props.onSearch("");
        this.props.onGetPages("", perPage);
        this.props.onGetResults("", 1, perPage);
    }

    render() {
        return (
            <div className="cardbox" onClick={this.handleClick}>
                <Link to='/search'>
                    <img src="/static/img/editor.jpg" width="256px" height="256px"/>
                </Link>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: (keyword) => {
            dispatch(searchKeyword(keyword))
        },
        onGetPages: (keyword, perPage) => {
            dispatch(searchPages(keyword, perPage))
        },
        onGetResults: (keyword, page, perPage) => {
            dispatch(rankRecipes(keyword, page, perPage))
        },
    };
};

export default connect(null, mapDispatchToProps)(Reservation);
