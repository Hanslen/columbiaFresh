import React, { Component } from 'react';
import MyHeader from '../MyHeader/MyHeader';
import classes from '../Account.css';
import Input from '../../UI/Input/Input';
import { updateObject, checkValidity, checkFormValidity, removeArray} from '../../../shared/utility';
import { read } from 'fs';
class settings extends Component{
    state = {
        FirstName: "Teacher",
        LastName: "Ding",
        Gender: "female",
        Email: "teacherStrong@gmail.com",
        Introduction: "Why Teacher Ding is so blood?!",
        controls: null,
        boxTitle: null,
        basiccontrols: {
            firstname: {
                label: "FirstName",
                elementType: 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'Enter firstName'
                },
                boxStyle: {
                    width:'40%',
                    float:'left'
                },
                value: '',
                validation: {
                  required: true
                },
                valid: false,
                touched: false
              },
              lastname: {
                label: "LastName",
                elementType: 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'Enter LastName'
                },
                boxStyle: {
                    width:'40%',
                    float:'right'
                },
                value: '',
                validation: {
                  required: true
                },
                valid: false,
                touched: false
              },
              gender: {
                  label: "Gender",
                  elementType: 'select',
                  elementConfig: {
                      options: [{
                        value: "male",
                        displayValue: "male"
                    },{
                          value: "female",
                          displayValue: "female"
                      }]
                  },
                  boxStyle:{
                      width: '100%',
                      float: 'left'
                  }
              },
              email: {
                label: "Email",
                elementType: 'input',
                elementConfig: {
                  type: 'email',
                  placeholder: 'Enter Email',
                  disabled: 'true'
                },
                boxStyle: {
                    width: '100%',
                    float: 'left'
                },
                value: '',
                validation: {
                  required: true,
                  isEmail: true
                },
                valid: false,
                touched: false
              },
              intro: {
                  label: "Introduction",
                  elementType: 'textarea',
                  elementConfig: {
                      type: 'email',
                      placehold: 'Please introduce yourself :D'
                  },
                  boxStyle:{
                      width: '100%',
                      float: 'left'
                  },
                  value: '',
                  validation:{
                      required: true
                  },
                  valid: false,
                  touched: false
              }
        },
        passwordControl:{
            oldPassword: {
                label: "Old Password",
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placehold: 'Enter old password'
                  },
                  boxStyle:{
                      width: '100%',
                      float: 'left'
                  },
                  value: '',
                  validation:{
                      required: true
                  },
                  valid: false,
                  touched: false
            },
            newPassword: {
                label: "New Password",
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placehold: 'Enter new password'
                  },
                  boxStyle:{
                      width: '100%',
                      float: 'left'
                  },
                  value: '',
                  validation:{
                      required: true
                  },
                  valid: false,
                  touched: false
            },
            newPasswordAgain: {
                label: "New Password Again",
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placehold: 'Enter new password again'
                  },
                  boxStyle:{
                      width: '100%',
                      float: 'left'
                  },
                  value: '',
                  validation:{
                      required: true
                  },
                  valid: false,
                  touched: false
            }
        },
        addressControl:{
            street1: {
                label: "Street Address 1",
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placehold: 'Street and number, P.O. box, c/o'
                  },
                  boxStyle:{
                      width: '100%',
                      float: 'left'
                  },
                  value: '',
                  validation:{
                      required: true
                  },
                  valid: false,
                  touched: false
            },
            street2: {
                label: "Street Address2",
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placehold: 'Apartment, suite, unit, building, floor, etc.'
                  },
                  boxStyle:{
                      width: '100%',
                      float: 'left'
                  },
                  value: '',
                  validation:{
                      required: true
                  },
                  valid: false,
                  touched: false
            },
            City: {
                label: "City",
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placehold: ''
                  },
                  boxStyle:{
                      width: '100%',
                      float: 'left'
                  },
                  value: '',
                  validation:{
                      required: true
                  },
                  valid: false,
                  touched: false
            },
            State: {
                label: "State/Province/Region",
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placehold: ''
                  },
                  boxStyle:{
                      width: '100%',
                      float: 'left'
                  },
                  value: '',
                  validation:{
                      required: true
                  },
                  valid: false,
                  touched: false
            },
            Zip: {
                label: "Zip code",
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placehold: ''
                  },
                  boxStyle:{
                      width: '100%',
                      float: 'left'
                  },
                  value: '',
                  validation:{
                      required: true
                  },
                  valid: false,
                  touched: false
            }
        },
        creditControl:{
            cardName: {
                label: "Name on card",
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placehold: ''
                  },
                  boxStyle:{
                      width: '100%',
                      float: 'left'
                  },
                  value: '',
                  validation:{
                      required: true
                  },
                  valid: false,
                  touched: false
            },
            cardNum:{
                label: "Card number",
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placehold: ''
                  },
                  boxStyle:{
                      width: '100%',
                      float: 'left'
                  },
                  value: '',
                  validation:{
                      required: true
                  },
                  valid: false,
                  touched: false
            }
        }
    }
    componentWillMount(){
        this.setState({controls: this.state.basiccontrols, boxTitle: "Basic Information"});
    }
    updateSettingBox(type){
        switch(type){
            case 'basic':this.setState({controls: this.state.basiccontrols, boxTitle: "Update Basic Information"});break;
            case 'password':this.setState({controls: this.state.passwordControl, boxTitle: "Update password"});break;
            case 'address':this.setState({controls: this.state.addressControl,boxTitle:"Update Address"});break;
            case 'credit':break;
            default:break;
        }
        console.log(type);
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
    render(){
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }
        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                label={formElement.config.label}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                boxStyle={formElement.config.boxStyle}
                value={this.state[formElement.config.label]}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} 
                />
          
        ) );
        return (
            <div className="tab-pane fade show active" id="nav-settings" role="tabpanel" aria-labelledby="nav-settings-tab">
                <div className="row">
                    <div className="col-3">
                        <div className="list-group" id="list-tab" role="tablist">
                            <a className="list-group-item list-group-item-action AccountMenu active" id="list-basic-list" data-toggle="list" href="#list-basic" role="tab" aria-controls="list-basic" aria-selected="true" onClick={() => this.updateSettingBox('basic')}>Basic Information</a>
                            <a className="list-group-item list-group-item-action AccountMenu" id="list-password-list" data-toggle="list" href="#list-password" role="tab" aria-controls="list-password" aria-selected="false" onClick={() => this.updateSettingBox('password')}>Password</a>
                            <a className="list-group-item list-group-item-action AccountMenu" id="list-address-list" data-toggle="list" href="#list-address" role="tab" aria-controls="list-address" aria-selected="false" onClick={() => this.updateSettingBox('address')}>Address</a>
                            <a className="list-group-item list-group-item-action AccountMenu" id="list-creditCard-list" data-toggle="list" href="#list-creditCard" role="tab" aria-controls="list-creditCard" aria-selected="false" onClick={() => this.updateSettingBox('credit')}>Credit Card</a>
                            <a className="list-group-item list-group-item-action AccountMenu" id="list-logOut-list" data-toggle="list" href="#list-logOut" role="tab" aria-controls="list-logOut" aria-selected="false">Log Out</a>
                         </div>
                    </div>
                    <div className="col-9" id={classes.rightBox}>
                    <h4>{this.state.boxTitle}</h4>
                                <form>
                                    {form}
                                </form>
                        {/* <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="list-basic" role="tabpanel" aria-labelledby="list-basic-list">
                                <h4>{this.state.boxTitle}</h4>
                                <form>
                                    {form}
                                </form>
                            </div>
                            <div className="tab-pane fade" id="list-password" role="tabpanel" aria-labelledby="list-password-list">
                                <h4>Update Password</h4>
                                <form>
                                    <Input />
                                </form>
                            </div>
                            <div className="tab-pane fade" id="list-address" role="tabpanel" aria-labelledby="list-address-list">B</div>
                            <div className="tab-pane fade" id="list-creditCard" role="tabpanel" aria-labelledby="list-creditCard-list">C</div>
                            <div className="tab-pane fade" id="list-logOut" role="tabpanel" aria-labelledby="list-logOut-list">D</div>
                        </div> */}
                    </div>
                </div>
                <br/>
            </div>
            );
    }
}
export default settings;