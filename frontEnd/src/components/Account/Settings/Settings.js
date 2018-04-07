import React, { Component } from 'react';
import MyHeader from '../MyHeader/MyHeader';
import classes from './Settings.css';
import Input from '../../UI/Input/Input';
import { updateObject, checkValidity, checkFormValidity, removeArray} from '../../../shared/utility';
import { read } from 'fs';
import Button from '../../UI/Button/Button';
import Axios from '../../../axios-config';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
class settings extends Component{
    state = {
        myFolders:["BasicInformation", "Password", "Address","CreditCard"],
        folderIcon:["fas fa-user", "fas fa-lock", "fas fa-address-card","far fa-credit-card"],
        // FirstName: "",
        // LastName: "",
        // Gender: "",
        // Email: "teacherStrong@gmail.com",
        // Introduction: "Why Teacher Ding is so blood?!",
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
                    width:'100%',
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
                    width:'100%',
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
                  },
                  value: "female"
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
                      type: 'text',
                      placeholder: 'Please introduce yourself :D'
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
                      type: 'password',
                      placeholder: 'Enter old password'
                  },
                  boxStyle:{
                      width: '100%',
                      float: 'left'
                  },
                  value: '',
                  validation: {
                    required: true
                  },
                  valid: false,
                  touched: false
            },
            newPassword: {
                label: "New Password",
                  elementType: 'input',
                  elementConfig: {
                      type: 'password',
                      placeholder: 'Enter new password (At least six characters)'
                  },
                  boxStyle:{
                      width: '100%',
                      float: 'left'
                  },
                  value: '',
                  validation: {
                    required: true,
                    minLength: 6
                  },
                  valid: false,
                  touched: false
            },
            newPasswordAgain: {
                label: "New Password Again",
                  elementType: 'input',
                  elementConfig: {
                      type: 'password',
                      placeholder: 'Enter new password again'
                  },
                  boxStyle:{
                      width: '100%',
                      float: 'left'
                  },
                  value: '',
                  validation: {
                    required: true,
                    minLength: 6
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
                      placeholder: 'Street and number, P.O. box, c/o'
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
                      placeholder: 'Apartment, suite, unit, building, floor, etc.'
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
                      placeholder: ''
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
                      placeholder: ''
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
                      placeholder: ''
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
                      placeholder: ''
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
                      placeholder: ''
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
            ExpirationMonth:{
                label: "Expiration Month",
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placeholder: 'Month'
                  },
                  boxStyle:{
                      width: '40%',
                      float: 'left'
                  },
                  value: '',
                  validation:{
                      required: true
                  },
                  valid: false,
                  touched: false
            },
            ExpirationYear:{
                label: 'Year',
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placeholder: 'Year'
                  },
                  boxStyle:{
                      width: '40%',
                      float: 'left',
                      marginLeft: '20%'
                  },
                  value: '',
                  validation:{
                      required: true
                  },
                  valid: false,
                  touched: false
            },
            cvv:{
                label: 'cvv',
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placeholder: 'cvv'
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
    activeHandler = (folder) => {
        for(var f in this.state.myFolders){
            $('#'+this.state.myFolders[f]).removeClass(classes.folderactive);
        }
        $('#'+folder).addClass(classes.folderactive);
        this.setState({selectedFolder:folder});
        switch(folder){
            case 'BasicInformation':
                this.setState({controls: this.state.basiccontrols, boxTitle: "Update Basic Information"});
                this.setBasicInformation();
                break;
            case 'Password':
                this.setState({controls: this.state.passwordControl, boxTitle: "Update password"});    
                break;
            case 'Address':
                this.setState({controls: this.state.addressControl,boxTitle:"Update Address"});
                this.setAddress();
                break;
            case 'CreditCard':
                this.setState({controls: this.state.creditControl, boxTitle: "Update Credit Card Information"});
                // console.log("QAQ");
                this.setCreditCard();
                break;
            default: break;
        }
    }

    setBasicInformation = () => {
        const postData = {
            token: this.props.token,
            userId: this.props.userId
        }
        Axios.post('/settings/basic',postData).then(response => {
            console.log(response);
            if(response.data.email != null){
                let gender = "male";
                if(response.data.gender[0] == 0){
                    gender = "female";
                }
                let updatedControls = updateObject(this.state.controls, {
                    ["email"]: updateObject(this.state.controls["email"], {
                        value: response.data.email
                    }),
                    ["firstname"] : updateObject(this.state.controls["firstname"], {
                        value: response.data.firstname[0]
                    }),
                    ["gender"]: updateObject(this.state.controls["gender"], {
                        value: gender
                    }),
                    ["lastname"]: updateObject(this.state.controls["lastname"], {
                        value: response.data.lastname[0]
                    }),
                    ["intro"]: updateObject(this.state.controls["intro"], {
                        value: response.data.introduction
                    })
                });
                // console.log(updatedControls);
                this.setState({controls: updatedControls});
            }
        }).catch(err => {
            this.props.setAlert("Connection failed..", true);
        })
    };

    setCreditCard = () => {
        const userData = {
            userId: this.props.userId,
            token: this.props.token
        };
        
        Axios.post('/settings/getcredit', userData)
            .then(response => {
                console.log(response.data.cardName);
                let updatedControls = updateObject(this.state.controls, {
                    ["cardName"] : updateObject(this.state.controls["cardName"], {
                        value: response.data.cardName
                    }),
                    ["cardNum"]: updateObject(this.state.controls["cardNum"], {
                        value: response.data.cardNumber
                    })
                });
                this.setState({controls: updatedControls});

            }).catch(error => {
                this.props.setAlert("Connection failed..", true);
            });
    }
    setAddress = () => {
        const postData = {
            userId: this.props.userId,
            token: this.props.token
        };
        Axios.post("/settings/address",postData).then(response => {
            console.log(response.data);
            let updatedControls = updateObject(this.state.controls, {
                ["street1"]: updateObject(this.state.controls["street1"], {
                    value: response.data.streetAddress1
                }),
                ["street2"]: updateObject(this.state.controls["street2"], {
                    value: response.data.streetAddress2
                }),
                ["City"]: updateObject(this.state.controls["City"], {
                    value: response.data.city
                }),
                ["State"]: updateObject(this.state.controls["State"], {
                    value: response.data.state_province_region
                }),
                ["Zip"]: updateObject(this.state.controls["Zip"], {
                    value: response.data.zipCode
                })
            });
            this.setState({controls: updatedControls});
        })
    }
    componentWillMount(){
        this.setState({controls: this.state.basiccontrols, boxTitle: "Basic Information"});
        this.setBasicInformation();
    }

    

    updateInformation = () => {
        if(this.state.controls.firstname != undefined){
            console.log("update Basic infor");
            let firstName = this.state.controls.firstname.value;
            let lastName = this.state.controls.lastname.value;
            let genderS = this.state.controls.gender.value;
            let email = this.state.controls.email.value;
            let introduction = this.state.controls.intro.value;
            let gender = 1;
            if(genderS == "female"){
                gender = 0;
            }
            this.props.updateBasic(this.props.userId, this.props.token, firstName, lastName, gender, email, introduction);
        }
        else if(this.state.controls.oldPassword != undefined){
            let oldPassword = this.state.controls.oldPassword.value;
            let newPassword = this.state.controls.newPassword.value;
            let newPasswordAgain = this.state.controls.newPasswordAgain.value;
            if(newPassword != newPasswordAgain){
                this.props.setAlert("Two password does not match!", true);
                return ;
            }
            this.props.updatePassword(this.props.userId, this.props.token, oldPassword, newPassword);
        }
        else if(this.state.controls.street1 != undefined){
            let streetAdress1 = this.state.controls.street1.value;
            let streetAdress2 = this.state.controls.street2.value;
            let city = this.state.controls.City.value;
            let state = this.state.controls.State.value;
            let zipCode = this.state.controls.Zip.value;
            this.props.updateAddress(this.props.userId, this.props.token, streetAdress1, streetAdress2, city, state,zipCode);
        }
        else if(this.state.controls.cardName != undefined){
            let cardName = this.state.controls.cardName.value;
            let cardNum = this.state.controls.cardNum.value;
            let expirationMonth = this.state.controls.ExpirationMonth.value;
            let expirationYear = this.state.controls.ExpirationYear.value;
            let cvv = this.state.controls.cvv.value;
            this.props.updateCredit(this.props.userId, this.props.token, cardName, cardNum, expirationMonth, expirationYear,cvv);
        }
        // console.log(this.state.controls);
    }
    inputChangedHandler = (event, controlName) => {
        // console.log(updatedControls);
        const updatedControls = updateObject(this.state.controls, {
          [controlName]: updateObject(this.state.controls[controlName],{
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
            touched: true
          })
        });
        // console.log(updatedControls);
        this.setState({controls: updatedControls});
      }
    render(){
        let folderCss = ["fas", "fa-folder-open",classes.folderIcon];
        let folderA = ["list-group-item", classes.foldera];
        let folders = this.state.myFolders.map((folder,id) => {
            if(id == 0){
                return(<a className={folderA.concat(classes.folderactive).join(" ")} key={folder} onClick={(id)=>this.activeHandler(folder)} id={folder}><i className={this.state.folderIcon[id]} id={classes.folderIcon}></i>{folder}</a>);
            }
            else{
                return(<a className={folderA.join(" ")} key={folder} onClick={(id)=>this.activeHandler(folder)} id={folder}><i className={this.state.folderIcon[id]} id={classes.folderIcon}></i>{folder}</a>);
            }    
        });
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
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} 
                />
          
        ) );
        return (
                    <div className="tab-pane fade" id="nav-settings" role="tabpanel" aria-labelledby="nav-settings-tab">
                        <div className="row">
                            <div className="col-3">
                                <div className="list-group" id="list-tab" role="tablist">
                                    {folders}    
                                </div>
                            </div>
                            <div className="col-9">
                                <div className={classes.folderContent}>
                                    <h4>{this.state.boxTitle}</h4>
                                    {form}
                                    <Button btnValue="Submit" onClick={this.updateInformation}/>
                                    <br/><br/><br/>
                                </div>
                            </div>
                        </div>
                        <br/>
                    </div>
            );
    }
}

const mapStateToProps = state =>{
    return {
        userId: localStorage.getItem("uid"),
        token: localStorage.getItem("token")
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateBasic: (userId, token, firstname, lastname, gender, email, introduction) => dispatch(actions.updateBasicInformation(userId, token, firstname, lastname,gender, email, introduction)),
        updatePassword: (userId, token, oldPassword, newPassword) => dispatch(actions.updatePassword(userId, token, oldPassword, newPassword)),
        updateAddress: (userId, token, streetAddress1, streetAddress2, city, state,zip) => dispatch(actions.updateAddress(userId, token, streetAddress1, streetAddress2, city, state,zip)),
        updateCredit: (userId, token, name, cardNumber, expirationMonth,expirationYear, cvv) => dispatch(actions.updateCredit(userId, token, name, cardNumber, expirationMonth,expirationYear, cvv)),
        setAlert: (error, isError) => dispatch(actions.setAlert(error, isError))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(settings);