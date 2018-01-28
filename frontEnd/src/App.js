import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
        
        </Layout>
      </div>
    );
  }
}

export default App;
