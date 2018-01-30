import React from 'react';
import { Link } from 'react-router-dom'
import classes from './Search.css';
import Sidebar from '../Sidebar/Sidebar';
import SearchRes from '../SearchRes/SearchRes';
import Reservation from '../Reservation/Reservation';

class search extends React.Component{
    render(){
        return (
            <div className="container">
                <div className="row standard-blank">
                    <div className="col-2"></div>
                    <div className="col-6">
                        <div className="input-group">
                            <input type="text" className="form-control" />
                            <div className="input-group-append">
                                <Link to="/searchMenu"><button type="button" className="btn btn-primary">Search</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-4"></div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <Sidebar />
                    </div>
                    <div className="col-6">
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
export default search;
