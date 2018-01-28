import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import HomePage from './components/HomePage/HomePage';
import Search from './components/Search/Search';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/search" exact component={Search}/>
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
