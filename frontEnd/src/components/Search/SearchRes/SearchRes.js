import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchRecipes } from '../../../store/actions/search';

class SearchRes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1
        };

        this.switchPage = this.switchPage.bind(this);
    }

    switchPage(page, e) {
        let perPage = 10;
        this.setState({ page });
        this.props.onGetResults(this.props.keyword, page, perPage);
    }

    render() {
        let recipeInfos = this.props.results;
        let listItems = recipeInfos.map(recipeInfo => {
                let ingredients = recipeInfo.ingredients.map(ingredient => ingredient.name+'; ');
                return (
                    <li key={recipeInfo.rid} className="list-group-item borderless">
                        <Link to={recipeInfo.url} style={{"textDecoration": "none"}}>
                            <div className="media">
                                <img className="mr-3" src={recipeInfo.imgurl} width="128px" height="128px" />
                                <div className="media-body">
                                    <h5 className="ellipsis mt-1 mb-1">{recipeInfo.title}</h5>
                                    <div className="ingreText ellipsis mb-1">{ingredients}</div>
                                    <div className="mb-1">
                                        <span className="redText">{recipeInfo.likes}</span>
                                        <span className="greyText"> likes</span>
                                    </div>
                                    <div className="greyText mb-1">{recipeInfo.author}</div>
                                </div>
                            </div>
                        </Link>
                    </li>
                )
            }
        );

        let range = [...Array(this.props.pages).keys()]
        //range = [...Array(5).keys()]
        let pages = range.map(i => 
            <li key={i+1} className="page-item">
                <button className="page-link" onClick={(e) => this.switchPage(i+1, e)}>{i+1}</button>
            </li>
        );
        return (
            <div>
                <ul className="list-group">{listItems}</ul>
                <br/><br/>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <button className="page-link" onClick={(e) => this.switchPage(this.state.page-1, e)}>
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </button>
                        </li>
                        {pages}
                        <li className="page-item">
                            <button className="page-link" onClick={(e) => this.switchPage(this.state.page+1, e)}>
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        pages: state.pagesReducer.pages,
        results: state.resultsReducer.results
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetResults: (keyword, page, perPage) => {
            dispatch(searchRecipes(keyword, page, perPage))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchRes);
