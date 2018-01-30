import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import classes from './Navigation.css';
// import {  }from 'react-router';
class navigation extends Component{
  state = {
    sign: "Sign Up"
  }
  logInClickHandler = () => {
    this.setState({sign: "Log In"});
  }

  signUpClickHandler = () => {
    this.setState({sign: "Sign Up"});
  }

  render(){
    let navBar = ['navbar', 'navbar-expand-lg','navbar-dark','box-shadow', classes.navDown];
    const toggerIcon = [classes.toggleColor];
    if(this.props.location.pathname !== '/'){
      navBar.push("classes.bgOrange");
    }
    else{
      navBar = ['navbar', 'navbar-expand-lg','navbar-dark','box-shadow', classes.navDown];
    }
    return (
        <nav class={navBar.join(' ')}>
          <div class="container d-flex justify-content-between">
              <Link to="/" class="navbar-brand d-flex align-items-center">
                {/* <img className={classes.logo} src="/static/img/logo.png"/> */}
              </Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar" style={{border: "2px solid white"}}>
                <span class={toggerIcon.join(" ")}></span>
            </button>
            <div class="navbar-collapse collapse" id="collapsingNavbar">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" id={classes.myNavLink} href="" data-toggle="modal" data-target="#signModal" style={{border: "2px solid #f3d861"}} onClick={this.logInClickHandler}>Log In</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id={classes.myNavLink} href="" data-target="#myModal" data-toggle="modal">Sign Up</a>
                    </li>
                </ul>
            </div>
            </div>

            <div class="modal fade" id="signModal" tabindex="-1" role="dialog" aria-labelledby="signModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id={classes.signModalLabel}>{this.state.sign}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                  <form>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Username</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username"/>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Password"/>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Password Again</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Password Again"/>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id={classes.signSubmit}>Submit</button>
                  </div>
                </div>
              </div>
        </div>
        </nav>
    );
  }
}
export default navigation;