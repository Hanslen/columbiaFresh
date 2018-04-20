import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../UI/Spinner/Spinner';
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
        let pages = range.map(i => i+1).map(i => 
            <li key={i} className={i === this.state.page ? "page-item active" : "page-item"}>
                <button className="page-link" 
                    disabled={i === this.state.page}
                    onClick={(e) => this.switchPage(i, e)}>
                    {i}
                </button>
            </li>
        );
        return (
            <div>
            { recipeInfos.length === 0 ?
                <Spinner /> :
                <div>
                    <ul className="list-group">{listItems}</ul>
                    <br/><br/>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className={this.state.page === 1 ? "page-item disabled" : "page-item"}>
                                <button className="page-link" 
                                    disabled={this.state.page === 1}
                                    onClick={(e) => this.switchPage(this.state.page-1, e)}>
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </button>
                            </li>
                            {pages}
                            <li className={this.state.page === this.props.pages ? "page-item disabled" : "page-item"}>
                                <button className="page-link" 
                                    disabled={this.state.page === this.props.pages}
                                    onClick={(e) => this.switchPage(this.state.page+1, e)}>
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            }
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
