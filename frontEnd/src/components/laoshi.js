import React, { Component } from 'react';
import axios from 'axios';
class laoshi extends Component{
    state = {
        name: null
    };
    wow = () => {
        axios.post('http://160.39.198.131:8111/guestRegister', {
            email: 'laoshi@mail.com',
            guest_name: 'Lao Shi',
            password: "nicai:-)"
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    render(){
        // axios.get('http://160.39.138.252:8111').then(response => {
        //     this.setState({name: response.data.teacher});
        // })
        // .catch(err => {
        // });
        return(
            <button onClick={this.wow}>_(:3=)_</button>
        );
    }
}
export default laoshi;