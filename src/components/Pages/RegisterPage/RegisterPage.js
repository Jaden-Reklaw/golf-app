import React, { Component } from 'react';
import {connect} from 'react-redux';

//import componets to be used on this page
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class RegisterPage extends Component {
  state = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_pwd: '',
    validated: false,
  };

  setValidated = () => {
    this.setState({validated: true});
  }

  registerUser = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setValidated();


    console.log('state is: ',this.state);
    //Things to check before dispatching to the server
    //input validation should be performed here for creating a user
    if (this.state.username && this.state.password === this.state.confirm_pwd) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          email: this.state.email,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className='div-body'>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <Card>
          <Card.Body>
          <Card.Title>Create New Account</Card.Title>
          <hr />
            <Form 
              onSubmit={this.registerUser}
              noValidate
              validated={this.state.validated}
            >

              {/* Username Field */}
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text"
                  pattern="[A-Za-z0-9]{4,}"
                  required
                  placeholder="Enter Username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
                <Form.Control.Feedback>
                  Username good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please choose a username that is 6 characters in length.
                </Form.Control.Feedback>
              </Form.Group>

              {/* First Name Field */}
              <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  type="text"
                  pattern="([A-Za-z]){2,30}"
                  required 
                  placeholder="Enter First Name"
                  value={this.state.first_name}
                  onChange={this.handleInputChangeFor('first_name')}
                />
                <Form.Control.Feedback>
                  Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter First Name.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Last Name Field */}
              <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  type="text"
                  pattern="[A-Za-z]{2,}"
                  required 
                  placeholder="Enter Last Name"
                  value={this.state.last_name}
                  onChange={this.handleInputChangeFor('last_name')}
                />
                <Form.Control.Feedback>
                  Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter Last Name.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Email Field */}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                  type="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required 
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor('email')}
                />
                <Form.Control.Feedback>
                  Email is good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter valid email address.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Password Field */}
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}"
                  required 
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')} 
                />
                <Form.Control.Feedback type="invalid">
                  Must contain at least one number and one uppercase and lowercase letter, and at least 8 to 20 characters
                </Form.Control.Feedback>
              </Form.Group>

              {/* Confirm Password Field */}
              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                  type="password"
                  required 
                  placeholder="Confirm Password"
                  value={this.state.confirm_pwd}
                  onChange={this.handleInputChangeFor('confirm_pwd')} 
                />
              </Form.Group>
          
              <Button 
                type="submit"
                block="true"
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
                    
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

