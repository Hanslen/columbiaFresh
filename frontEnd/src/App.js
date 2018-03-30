import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from './hoc/Layout/Layout';
import HomePage from './components/HomePage/HomePage';
import Search from './components/Search/Search';
import Recipe from './components/Recipe/Recipe';
import * as actions from './store/actions/index';
import laoshi from './components/laoshi';
import Account from './components/Account/Account';
import accountManage from './components/Navigation/AccountManage/AccountManage';
import Order from './components/OrderPage/Order';


class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/search" exact component={Search}/>
        <Route path="/recipe/:id" exact component={Recipe}/>
        <Route path="/laoshi" exact component={laoshi}/>
        <Route path="/myprofile" exact component={Account}/>
        <Route path="/verifyEmail/:token" exact component={accountManage}/>
        <Route path="/placeorder" exact component={Order}/>
      </Switch>
    );
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.email !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
