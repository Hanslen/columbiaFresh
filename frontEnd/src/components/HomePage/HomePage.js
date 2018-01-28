import React,  {Component } from 'react';
import { Link } from 'react-router-dom';

class homePage extends Component{
    state = {
        categories: ["Breakfast", "Lunch", "Dinner", "Snack", "Vegan", "Sandwich"]
    };
    render(){
        let categoriesDiv = this.state.categories.map(category => (
            <div className="col-md-4" key={category}>
              <div className="card mb-4 box-shadow">
                <img className="card-img-top" src="/static/img/test.png" alt="Card image cap" />
                <div className="card-body">
                  <p className="card-text">{category}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small className="text-muted">9 mins</small>
                  </div>
                </div>
              </div>
            </div>
        ));
        return(
            <div>
                <section className="jumbotron text-center">
                    <div className="container">
                    <h1 className="jumbotron-heading">_(:3=)_</h1>
                    <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
                    <p>
                        <input type="text" className="form-control" placeholder="Tell us what you want to eat...0.0"/><br/>
                        <Link to="/search"><button type="button" className="btn btn-primary">Search</button></Link>
                    </p>
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