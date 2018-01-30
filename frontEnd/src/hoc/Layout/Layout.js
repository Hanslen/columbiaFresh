import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import StaticRouter from 'react-router-dom/StaticRouter';

class Layout extends Component{
    render() {
        return (
            <Aux>
                <Route path="/" component={Navigation}/>
                <main>
                    {this.props.children}
                </main>
                <Footer/>
            </Aux>
        )
    }
};

export default Layout;