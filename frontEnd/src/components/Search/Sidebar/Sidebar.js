import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../../../axios-config';
import { searchRecipe } from '../../../store/actions/search';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menus: [
                { name: 'Menu1', isSelect: false }, 
                { name: 'Menu2', isSelect: false }, 
                { name: 'Menu3', isSelect: false }, 
                { name: 'Menu4', isSelect: false }, 
                { name: 'Menu5', isSelect: false }
            ]
        };
    }

    componentDidMount() {
        axios.get('/hotMenu')
        .then(function(response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    handleMouseOver(id, e) {
        let newMenus = this.state.menus.map((menu, i) => 
            (i === id) ? {...menu, isSelect: true} : {...menu, isSelect: false}
        );
        this.setState({ menus: newMenus });
    }

    handleMouseOut(e) {
        let newMenus = this.state.menus.map(menu => {
            return {...menu, isSelect: false};
        });
        this.setState({ menus: newMenus });
    }

    handleSearch(keyword, e) {
        this.props.onSearch(keyword);
    }

    render() {
        let listItems = this.state.menus.map((menu, i) => 
            <li key={i} className="list-group-item list-group-item-action borderless sidebar-item"
                onMouseOver={(e) => this.handleMouseOver(i, e)} 
                onMouseOut={(e) => this.handleMouseOut(e)} 
                onClick={(e) => this.handleSearch(menu.name, e)}
                style={{ color: menu.isSelect ? 'red' : 'none' }}>
                {menu.name}
            </li>
        );
        return (
            <div>
                <ul className="list-group">{listItems}</ul>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: (keyword) => {
            dispatch(searchRecipe(keyword))
        }
    }
}

export default connect(null, mapDispatchToProps)(Sidebar);
