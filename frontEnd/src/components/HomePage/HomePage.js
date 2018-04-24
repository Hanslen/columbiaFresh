import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './HomePage.css'
import SearchBox from '../UI/SearchBox/SearchBox';
import spinner from '../UI/Spinner/Spinner';
import shoppingcart from '../Account/ShoppingCart/ShoppingCart';
import { searchKeyword, searchPages, searchRecipes } from '../../store/actions/search';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [
                {type: "Salad", src: "/static/img/salad.jpeg"},
                {type: "Meat", src: "/static/img/meat.jpeg"},
                {type: "Breakfast", src: "/static/img/break.jpeg"},
                {type: "Dessert", src: "/static/img/dessert.jpeg"},
                {type: "Chinese", src: "/static/img/warm.jpeg"},
                {type: "Burger", src: "/static/img/burger.jpeg"}
            ],
            url: "/recipe/id=100"
        };
    
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentWillMount() {
        this.props.onSearch("");
    }

    handleClick(type, e) {
        let perPage = 10;
        this.props.onSearch(type);
        this.props.onGetPages(type, perPage);
        this.props.onGetResults(type, 1, perPage);
    }

    render() {
        let categoriesDiv = this.state.categories.map(category => {
            let searchURL = "/search?"+category.type;
            return (
                <Link to={searchURL} className="col-md-4" key={category.type}>
                    <div className="card mb-4 box-shadow" onClick={(e) => this.handleClick(category.type, e)}>
                        <img className="card-img-top" id={classes.cardImg} src={category.src} alt="Card image cap" />
                        <div id={classes.cardTypeLabel}>{category.type}</div>
                    </div>
                </Link>
            );
        });
        return (
            <div>
                <section className="jumbotron text-center" id={classes.mainBgPic}>
                
                    <div className="container" id={classes.headingBox}>
                    <h1 className="jumbotron-heading"><strong>Columbia Fresh</strong></h1>
                    <br/><br/>
                    <p className="lead" id="jumbotron-sub"> Our product, an on-line to off-line website called “Columbia Fresh”, is aimed to connect these two groups through our platform. Lead a healthy and convenient life.</p>
                    <br/><br/>
                    {/* <p>
                        <input type="text" className="form-control" placeholder="Tell us what you want to eat...0.0"/><br/>
                        <Link to="/search"><button type="button" className="btn btn-primary" style={{color:"white",backgroundColor:"#f3d861",border:"none"}}>Search</button></Link>
                    </p> */}
                    <SearchBox btnStyle={classes.btnDeep} placeHolder="Tell us what you want to eat :D "/>
                    <p className="lead" id="jumbotron-sub" style={{fontSize:"0.8em",marginTop:"8%",fontWeight:"bolder"}}>Rowser New American Coffee<br/> Photo by MyThy H.</p>
                    
                    </div>
                </section>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row">
                            {categoriesDiv}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: (keyword) => {
            dispatch(searchKeyword(keyword))
        },
        onGetPages: (keyword, perPage) => {
            dispatch(searchPages(keyword, perPage))
        },
        onGetResults: (keyword, page, perPage) => {
            dispatch(searchRecipes(keyword, page, perPage))
        },
    };
};

export default connect(null, mapDispatchToProps)(HomePage);
