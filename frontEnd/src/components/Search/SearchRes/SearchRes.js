import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SearchRes extends React.Component {
    render() {
        let recipeInfos = this.props.results;
        let listItems = recipeInfos.map(recipeInfo => {
                return (
                    <li key={recipeInfo.rid} className="list-group-item borderless">
                        <Link to={recipeInfo.url} style={{"textDecoration": "none"}}>
                            <div className="media">
                                <img className="mr-3" src={recipeInfo.imgurl} width="128px" height="128px" />
                                <div className="media-body">
                                    <h5 className="mt-1 mb-1">{recipeInfo.title}</h5>
                                    <div className="mb-1">{recipeInfo.ingredients}</div>
                                    <div className="mb-1">{recipeInfo.likes}</div>
                                    <div className="mb-1">{recipeInfo.author}</div>
                                </div>
                            </div>
                        </Link>
                    </li>
                )
            }
        );
        let range = [1, 2, 3, 4, 5]
        let pages = range.map(i => 
            <li key={i} className="page-item">
                <a className="page-link" href="#">{i}</a>
            </li>
        );
        return (
            <div>
                <ul className="list-group">{listItems}</ul>
                <br/><br/>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                        {pages}
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        results: state.resultsReducer.results
    };
};

export default connect(mapStateToProps)(SearchRes);
