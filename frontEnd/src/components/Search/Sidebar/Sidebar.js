import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../../../axios-config';
import { searchKeyword, searchRecipes } from '../../../store/actions/search';

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
        let saveHot = (menus) => this.setState({ menus });
        axios.get('/hotMenu')
        .then(function(response) {
            let menus = response.data.menus.map(menu => {
                return { name: menu, isSelect: false }
            });
            saveHot(menus);
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
        this.props.onGetResults(keyword);
    }

    render() {
        let listItems = this.state.menus.map((menu, i) => {
            let itemURL = "/search?"+menu.name;
            return (
                <Link to={itemURL} key={i} style={{"textDecoration": "none"}}>
                    <li className="list-group-item list-group-item-action borderless sidebar-item"
                        onMouseOver={(e) => this.handleMouseOver(i, e)} 
                        onMouseOut={(e) => this.handleMouseOut(e)} 
                        onClick={(e) => this.handleSearch(menu.name, e)}
                        style={{ color: menu.isSelect ? 'red' : 'black' }}>
                        {menu.name}
                    </li>
                </Link>
            );
        });
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
            dispatch(searchKeyword(keyword))
        },
        onGetResults: (keyword) => {
            dispatch(searchRecipes(keyword))
        }
    }
}

export default connect(null, mapDispatchToProps)(Sidebar);
