import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Modal2 from '../../../components/UI/Modal2/Modal2';
import { updatedObject, checkValidity } from '../../../shared/utility';
import Button from '../../../components/UI/Button/Button';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux'; 
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter  } from 'react-router-dom';
import classes from './Login.css';


class Login extends Component {
  state = {
    elements: {
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
    this.props.onLogin(this.state.elements.email.value, this.state.elements.password.value); 
   // setTimeout(explode, 3000);
}

goBack = (props) => {
    this.props.history.goBack();
  }


  render() {
    let usFed = null;
    if(this.props.error){
    console.log(this.props.error.message);}
    this.props.error ? usFed=<p >Current password and email does not match</p> : usFed=null;

    let log =     
        (
          <Form block>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="exampleEmail" className= "mr-sm-2">Email</Label>
              <Input value={this.state.elements.email.value} 
                    className={this.state.elements.email.valid ? "border-success" : "border-danger"} 
                    type="email" name="email" id="exampleEmail" 
                    placeholder={this.state.elements.email.elementConfig.placeholder} 
                    onChange={(event) => this.inputChangedHandler(event, 'email')} />
                    
            </FormGroup>
            <br />
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="examplePassword" className="mr-sm-2">Password</Label>
              <Input value={this.state.elements.password.value}  
                    className={this.state.elements.password.valid ? "border-success" : "border-danger"} 
                    type="password" name="password" id="examplePassword" 
                    placeholder={this.state.elements.password.elementConfig.placeholder} 
                    onChange={(event) => this.inputChangedHandler(event, 'password')}/>
                    
            </FormGroup>
           
            <br />
            <form className={classes.divStyle} onSubmit={this.submitHandler}>
            {usFed}
            <Button onClick={this.submitHandler} disabled={!this.state.formIsValid} btnType={this.state.formIsValid ? 'Success' : 'Danger' }  tag={Link} to="/"> login</Button>
            </form>
          </Form>
        );
        if (this.props.loading) {
            log = <Spinner />
        }
        

        let redirect = null;
        if (this.props.auth) {
            redirect = this.goBack();
        }
     
    return (
    <Modal2 >
        {log}
        {redirect}
      </Modal2>
    );
  }
}

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        auth: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email, password))
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));