import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../axios-config';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menus: ['Menu1', 'Menu2', 'Menu3', 'Menu4', 'Menu5']
        };
        
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    componentDidMount() {
        axios.get('/hotMenu')
        .then(function(response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    handleMouseOver() {

    }

    render() {
        let listItems = this.state.menus.map(menu => 
            <li key={menu} className="list-group-item borderless sidebar-item"
                onMouseOver={this.handleMouseOver} >
                <Link to='/search?keyword=menu'>{menu}</Link>
            </li>
        );
        return (
            <div>
                <ul className="list-group">{listItems}</ul>
            </div>
        );
    }
}

export default Sidebar;
