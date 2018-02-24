import React from 'react';

import styles from './SearchRes.css';

class Sidebar extends React.Component {
    render() {
        let range = [1, 2, 3, 4, 5];
        let liClasses = ["media", "standard-blank"];
        let listItems = range.map(i => 
            <li key={i} className={liClasses.join(' ')}>
                <img className="mr-3" src="http://via.placeholder.com/128x128" />
                <div className="media-body">
                    <h5 className="mt-1 mb-1">Menu</h5>
                    <div className="mb-1">ingredients</div>
                    <div className="mb-1">Author</div>
                </div>
            </li>
        );
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

export default Sidebar;
