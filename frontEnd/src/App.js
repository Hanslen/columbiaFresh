import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import HomePage from './components/HomePage/HomePage';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={HomePage} />
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

export default App;
