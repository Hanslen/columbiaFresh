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
import Account from './components/Account/Account';
import accountManage from './components/Navigation/AccountManage/AccountManage';
import Order from './components/OrderPage/Order';
import createRecipe from './components/createRecipe/createRecipe';
import orderDetail from './components/Account/OrderDetail/OrderDetail';
import my404Component from './components/my404Component';
import supplier from './components/Supplier/Supplier';
import UserAccount from './components/Account/UserAccount';

class App extends Component {
  componentWillMount(){
    this.props.onTryAutoSignup();
    this.props.cancelAlert();
    this.props.initializeIngredients();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/search" exact component={Search}/>
        <Route path="/recipe/:id" exact component={Recipe}/>
        <Route path="/createRecipe" exact component={createRecipe}/>
        <Route path="/myprofile" exact component={Account}/>
        <Route path="/userprofile/:id" exact component={UserAccount}/>
        <Route path="/verifyEmail/:token" exact component={accountManage}/>
        <Route path="/placeorder" exact component={Order}/>
        <Route path="/myorder/:orderId" exact component={orderDetail} />
        <Route path="/supplier" exact component={supplier} />
        <Route path='*' exact={true} component={my404Component} />
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
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    cancelAlert: () => dispatch(actions.closeAlert()),
    initializeIngredients: () => dispatch(actions.initializeIngredients)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
