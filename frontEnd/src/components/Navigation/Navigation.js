import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import classes from './Navigation.css';
import SearchBox from '../UI/SearchBox/SearchBox';
import Input from '../UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
class navigation extends Component{
  state = {
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

  submitHandler = () => {
    this.props.onLogIn();
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
    console.log("Authenticated: "+this.props.isAuthenticated);

    // map
    const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
          <div className="form-group">
            <Input
                key={formElement.id}
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


    return (
        <nav className={navBar.join(' ')}>
          <div className="container d-flex justify-content-between">
              <Link to="/" className="navbar-brand d-flex align-items-center" style={{marginRight:"-17%",width:"200px"}}>
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
                  {/* {this.state.signForm} */}
                  {form}
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
      onLogIn: (email, password) => dispatch(actions.authLogIn(email, password))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(navigation);