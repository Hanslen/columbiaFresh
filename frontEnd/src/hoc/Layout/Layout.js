import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Navigation from '../../components/Navigation/Navigation';

class Layout extends Component{
    render() {
        return (
            <Aux>
                <Navigation />
                <main>
                </main>
            </Aux>
        )
    }
};
export default Layout;