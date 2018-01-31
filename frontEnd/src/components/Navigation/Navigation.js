import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import classes from './Navigation.css';
import SearchBox from '../UI/SearchBox/SearchBox';
import Input from '../UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { link } from 'fs';
import ReactSVG from 'react-svg';
import $ from 'jquery'; 
import { updateObject, checkValidity, checkFormValidity} from '../../shared/utility';

class navigation extends Component{
  state = {
    items: [{
      name: "Big Delicious Beef Cheese burger",
      price: "10",
      number: 1,
      src: "/static/img/shoppingcart.jpg"
    },
    {
      name: "Big Big Beef Cheese burger",
      price: "1000",
      number: 3,
      src: "/static/img/shoppingcart.jpg"
    },
    {
      name: "Big Big Big Beef Cheese burger",
      price: "10",
      number: 1,
      src: "/static/img/shoppingcart.jpg"
    }],
    sign: "Sign Up",
    signMsg: "Already have an account!",
    signBtn: 'LogIn',
    controls: {
      email: {
        label: "Email",
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Enter Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      username: {
        label: "Username",
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter username'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      password:{
        label: "Password",
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Enter Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      passwordAgain: {
        label: "Password Again",
        elementType: 'input',
        elementConfig:{
          type: 'password',
          placeholder: 'Enter Password Again'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  }

  setToLogIn = () => {
    this.setState({sign: "Log In", 
                  signMsg: "Dont' have an account?",
                  signBtn: 'Create',
                  controls: {
                    email: {
                      label: "Email",
                      elementType: 'input',
                      elementConfig: {
                        type: 'email',
                        placeholder: 'Enter Email'
                      },
                      value: '',
                      validation: {
                        required: true,
                        isEmail: true
                      },
                      valid: false,
                      touched: false
                    },
                    password:{
                      label: "Password",
                      elementType: 'input',
                      elementConfig: {
                        type: 'password',
                        placeholder: 'Enter Password'
                      },
                      value: '',
                      validation: {
                        required: true,
                        minLength: 6
                      },
                      valid: false,
                      touched: false
                    }
                  }});
  }

  setToSignUp = () => {
    this.setState({sign: "Sign Up", 
                  signMsg: "Already have an account!",
                  signBtn: 'LogIn',
                  controls: {
                    email: {
                      label: "Email",
                      elementType: 'input',
                      elementConfig: {
                        type: 'email',
                        placeholder: 'Enter Email'
                      },
                      value: '',
                      validation: {
                        required: true,
                        isEmail: true
                      },
                      valid: false,
                      touched: false
                    },
                    username: {
                      label: "Username",
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        placeholder: 'Enter username'
                      },
                      value: '',
                      validation: {
                        required: true
                      },
                      valid: false,
                      touched: false
                    },
                    password:{
                      label: "Password",
                      elementType: 'input',
                      elementConfig: {
                        type: 'password',
                        placeholder: 'Enter Password'
                      },
                      value: '',
                      validation: {
                        required: true,
                        minLength: 6
                      },
                      valid: false,
                      touched: false
                    },
                    passwordAgain: {
                      label: "Password Again",
                      elementType: 'input',
                      elementConfig:{
                        type: 'password',
                        placeholder: 'Enter Password Again'
                      },
                      value: '',
                      validation: {
                        required: true,
                        minLength: 6
                      },
                      valid: false,
                      touched: false
                    }
                  }});
  }

  logInClickHandler = () => {
    this.setToLogIn();
  }

  signUpClickHandler = () => {
    this.setToSignUp();
  }

  switchModalBoxHandler = () => {
    if(this.state.sign == "Sign Up"){
      this.setToLogIn();
    }
    else{
      this.setToSignUp();
    }
  }
  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName],{
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    });
    this.setState({controls: updatedControls});
  }


  submitHandler = () => {
    if(checkFormValidity(this.state.controls)){
      console.log("All is true...");
      $("#signModal .close").click();
    }
    else{
      console.log("Contained false...");
      alert("Error....");
      return ;
    }
    if(this.state.sign == "Sign Up"){
      console.log("Sign Up Button Click...");
      
      this.props.onLogIn(this.state.controls.email.value, this.state.controls.password.value);
    }
    else{
      console.log("Log In Button Click...");
      this.props.onLogIn(this.state.controls.email.value, this.state.controls.password.value);
    }
  }

  render(){
    let navBar = ['navbar', 'navbar-expand-lg','navbar-dark', classes.navDown];
    const toggerIcon = [classes.toggleColor];
    if(this.props.location.pathname !== '/'){
      navBar.push(classes.bgColor);
      navBar.push("box-shadow");
    }
    else{
      navBar = ['navbar', 'navbar-expand-lg','navbar-dark',classes.navDown];
    }

    // map
    const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
          <div className="form-group" key={formElement.id}>
            <Input
                label={formElement.config.label}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
          </div>
        ) );

        let shoppingCart = this.state.items.map((item, value) => (
          <div key={value}>
              <div className="dropdown-item">
                <div className="row" id={classes.shoppingCartItem}>
                  <div className="col-md-3">
                    <img src={item.src}/>
                  </div>
                  <div className="col-md-9">
                      <h6>{item.name}</h6>
                      <span>
                        <a>Delete</a>
                        <p>{item.number}x${item.price}</p>
                      </span>
                   </div>
                 </div>
            </div>
            <div className="dropdown-divider"></div>
          </div>
        ));


    return (
        <nav className={navBar.join(' ')}>
          <div className="container d-flex justify-content-between">
              <Link to="/" className="navbar-brand d-flex align-items-center" style={{marginRight:"-10%",width:"200px"}}>
              {this.props.location.pathname !== '/'?<img className={classes.logo} src="/static/img/logo.png"/>:null}
              </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar" style={{border: "2px solid white"}}>
                <span className={toggerIcon.join(" ")}></span>
            </button>
            <div className="navbar-collapse collapse" id="collapsingNavbar">
                  {this.props.location.pathname !== '/'?
                      <SearchBox className="mx-auto d-flex" btnStyle={classes.btnDeep} searchBoxStyle={{marginRight:"11%"}}/>:null
                  }
                <ul className="navbar-nav ml-auto">
                  {this.props.location.pathname === '/' && !this.props.isAuthenticated?
                  <li className="nav-item">
                      <a className="nav-link" id={classes.myNavLink} href="" data-toggle="modal" data-target="#signModal" style={{border: "2px solid rgba(0,0,0,0)"}} onClick={this.logInClickHandler}>Log In</a>
                  </li>:null
                  }
                  {!this.props.isAuthenticated?
                      <li className="nav-item">
                          <a className="nav-link" id={classes.myNavLink} href="" data-target="#signModal" data-toggle="modal" onClick={this.signUpClickHandler}>Sign Up</a>
                      </li>:
                        <li className="nav-item">
                          <div className="nav-link">
                          <a id={classes.shoppingCartSvg}><ReactSVG path="/static/img/cart.svg" className={classes.shoppingCart} style={{width:25, fill: "white"}} /></a>
                          <div className={classes.shoppingBox}>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" id={classes.shoppingCartSub}>
                                {shoppingCart}
                                <p className="dropdown-item">Total Price: 100</p>
                                <a className="dropdown-item" href="#" id={classes.shoppingCartSubBtn}>Checkout</a>
                            </div>
                          </div>
                          </div>
                        </li>
                  }
                  {this.props.isAuthenticated?
                  <li className="nav-item">
                          <img className={classes.userIcon} id={classes.userProfileImg} src="/static/img/user.jpg"/>
                          <div className={classes.userProfileBox}>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" id={classes.userBoxSub}>
                              <a className="dropdown-item" href="#">My Orders</a>
                              <a className="dropdown-item" href="#">Edit Profiles</a><div className="dropdown-divider"></div>
                              <a className="dropdown-item" onClick={this.props.onLogOut}>LogOut</a>
                            </div>
                          </div>
                  </li>:null
                  }
                </ul>
            </div>
            </div>
          

          {/* form modal */}
            <div className="modal fade" id="signModal" tabIndex="-1" role="dialog" aria-labelledby="signModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header" id={classes.signHeader}>
                    {/* <h5 className="modal-title text-center">{this.state.sign}</h5> */}
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                  <form>
                    {form}
                  </form>
                  </div>
                    <button type="button" className="btn btn-primary" id={classes.signSubmit} onClick={this.submitHandler}>{this.state.sign}</button>
                    <br/>
                  <div className="modal-footer">
                  <button type="button" className="btn" disabled="true">{this.state.signMsg}</button>
                    <button type="button" className="btn" id={classes.signModalSub} onClick={this.switchModalBoxHandler}>{this.state.signBtn}</button>
                  </div>
                </div>
              </div>
        </div>
        </nav>
    );
  }
}
const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.token !== null
  };
}
const mapDispatchToProps = dispatch => {
  return {
      onLogIn: (email, password) => dispatch(actions.authLogIn(email, password)),
      onLogOut: () => dispatch(actions.logout())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(navigation);