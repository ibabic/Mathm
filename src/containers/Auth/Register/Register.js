import React, { Component } from 'react';
import { Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';
import Modal2 from '../../../components/UI/Modal2/Modal2';
import { updatedObject, checkValidity } from '../../../shared/utility';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux'; 
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter  } from 'react-router-dom';
import classes from './Register.css';


class Register extends Component {
    state = {
        elements: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'username',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    minLength: 3,
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
              elementType: 'input',
              elementConfig: {
                  type: 'password',
                  placeholder: 'Password'
              },
              value: '',
              validation: {
                  required: true,
                  minLength: 8
              },
              valid: false,
              touched: false
          },
          level: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 1},
                    {value: 2},
                    {value: 3}
                ]
            },
            value: 1,
            validation: {},
            valid: true
        }
        },
         formIsValid: false
    }
    
    inputChangedHandler = ( event, controlName ) => {
       
            const updatedControls = updatedObject( this.state.elements, {
                [controlName]: updatedObject( this.state.elements[controlName], {
                    value: event.target.value,
                    valid: checkValidity( event.target.value, this.state.elements[controlName].validation ),
                    touched: true
                } )
            } );
        
      
      
      let formIsValid = true;
              for (let controlName in updatedControls) {
                  formIsValid = updatedControls[controlName].valid && formIsValid;
              }
      this.setState( { elements: updatedControls, formIsValid: formIsValid } );
      }

      submitHandler = (event) => {
          event.preventDefault();
          console.log('submitHandler');
          this.props.onAuth(this.state.elements.email.value, this.state.elements.password.value, this.state.elements.level.value, this.state.elements.username.value) 
      }

      goBack = (props) => {
        this.props.history.goBack();
      }

       search = (nameKey, myArray) =>{
        for (let i=0; i < myArray.length; i++) {
            if (myArray[i].username === nameKey) {
                console.log(myArray.length);
                return true;
            }
        }
    }

  render() {
        var arr = [];
        for (var key in this.props.players) {
             arr.push(this.props.players[key]);
        }
    var usernameExist = (!this.search(this.state.elements.username.value, arr));
    console.log('UsernameExist', usernameExist);    
    let usErr = null;
    this.props.error ? usErr=<p >This email already exists</p> : usErr=null;
    let usName = <Input value={this.state.elements.username.value} invalid onChange={(event) => this.inputChangedHandler(event, 'username', usernameExist)}/>;
    this.state.elements.username.valid && usernameExist ? usName=<Input value={this.state.elements.username.value} valid onChange={(event) => this.inputChangedHandler(event, 'username')}/> : usName
    
    let usFed = null;
    if(this.state.elements.username.touched)
    this.state.elements.username.valid && usernameExist ? usFed=<FormFeedback valid>Sweet! that name is available</FormFeedback> : usFed=<FormFeedback>Oh noes! that name is already taken</FormFeedback>

    let reg = (
        <Form>
        <FormGroup>
        <Label for="exampleEmail">Username</Label>
        {usName}
        {usFed}
        </FormGroup>
        <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input value={this.state.elements.email.value} 
                className={this.state.elements.email.valid && !this.props.error ? "border-success" : "border-danger"} 
                type="email" name="email" id="exampleEmail" 
                placeholder={this.state.elements.email.elementConfig.placeholder}
                onChange={(event) => this.inputChangedHandler(event, 'email')} />
        </FormGroup>
        <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input value={this.state.elements.password.value}  
                className={this.state.elements.password.valid ? "border-success" : "border-danger"} 
                type="password" name="password" id="examplePassword" 
                placeholder={this.state.elements.password.elementConfig.placeholder}
                onChange={(event) => this.inputChangedHandler(event, 'password')} />
        </FormGroup>
        <FormGroup>
        <Label for="exampleSelect">Select Level</Label>
        <Input  onChange={(event) => this.inputChangedHandler(event, 'level')}
        type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
        </Input>
        </FormGroup>
        <form className={classes.divStyle} onSubmit={this.submitHandler}>
        {usErr}
        <Button  disabled={(!this.state.formIsValid || !usernameExist)} btnType={(this.state.formIsValid && usernameExist) ? 'Success' : 'Danger' }  tag={Link} to="/">Register</Button>
        </form>
    </Form>
    );

    if (this.props.loading) {
        reg = <Spinner />
    }

        let redirect = null;
        if (this.props.auth) {
            redirect = this.goBack();
        }

    return (
      <Modal2 >
        {reg}
        {redirect}
      </Modal2>  
    );
  }
}
const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        auth: state.auth.token,
        players: state.rang.players
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, level, username) => dispatch(actions.auth(email, password, level, username))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));