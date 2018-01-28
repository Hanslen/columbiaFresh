import React,  {Component } from 'react';

class homePage extends Component{
    state = {
        categories: ["Breakfast", "Lunch", "Dinner", "Snack", "Vegan", "Sandwich"]
    };
    render(){
        let categoriesDiv = this.state.categories.map(category => (
            <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" alt="Card image cap" />
                <div class="card-body">
                  <p class="card-text">{category}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-muted">9 mins</small>
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
                        <input type="text" className="form-control" placeholder="Tell us what you want to eat..."/>
                    </p>
                    </div>
                </section>
                <div class="album py-5 bg-light">
                    <div class="container">
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