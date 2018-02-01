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
                    level 1 > level 2 > level 3
                </div>
                <div className="row mt-3">
                    <div className="col-2">
                        <Sidebar />
                    </div>
                    <div className="col-6">
                        <h3>Search Key Word</h3>
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
