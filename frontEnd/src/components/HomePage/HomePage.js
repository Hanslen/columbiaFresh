import React,  {Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './HomePage.css'
import SearchBox from '../UI/SearchBox/SearchBox';

class homePage extends Component{
    state = {
        categories: [
            {type: "Breakfast", src: "/static/img/breakfast.png"},
            {type: "Lunch", src: "/static/img/breakfast.png"},
            {type: "Dinner", src: "/static/img/breakfast.png"},
            {type: "Wrap", src: "/static/img/breakfast.png"},
            {type: "Vegan", src: "/static/img/breakfast.png"},
            {type: "Burger", src: "/static/img/breakfast.png"}
        ]
    };
    render(){
        let categoriesDiv = this.state.categories.map(category => (
            <div className="col-md-4" key={category.type}>
              <div className="card mb-4 box-shadow">

                <img className="card-img-top" id={classes.cardImg} src={category.src} alt="Card image cap" />
                <div id={classes.cardTypeLabel}>{category.type}</div>
                {/* <div className="card-body"> */}
                  {/* <p className="card-text">{category.type}</p> */}
                  {/* <div className="d-flex justify-content-between align-items-center"> */}
                    {/* <div className="btn-group"> */}
                      {/* <button type="button" className="btn btn-sm btn-outline-secondary">View</button> */}
                      {/* <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button> */}
                    {/* </div> */}
                    {/* <small className="text-muted">9 mins</small> */}
                  {/* </div> */}
                {/* </div> */}
              </div>
            </div>
        ));
        return(
            <div>
                <section className="jumbotron text-center" id={classes.mainBgPic}>
                    <div className="container">
                    <h1 className="jumbotron-heading"><strong>Columbia Fresh</strong></h1>
                    <br/><br/>
                    <p className="lead" id="jumbotron-sub">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
                    <br/><br/>
                    {/* <p>
                        <input type="text" className="form-control" placeholder="Tell us what you want to eat...0.0"/><br/>
                        <Link to="/search"><button type="button" className="btn btn-primary" style={{color:"white",backgroundColor:"#f3d861",border:"none"}}>Search</button></Link>
                    </p> */}
                    <SearchBox btnStyle={classes.btnDeep}/>
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
export default homePage;