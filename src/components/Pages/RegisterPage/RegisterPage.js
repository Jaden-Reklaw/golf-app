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
  };

  registerUser = (event) => {
    event.preventDefault();

    console.log('state is: ',this.state);
    //Things to check before dispatching to the server
    //input validation should be performed here for creating a user
    // if (this.state.username && this.state.password) {
    //   this.props.dispatch({
    //     type: 'REGISTER',
    //     payload: {
    //       username: this.state.username,
    //       email: this.state.email,
    //       first_name: this.state.first_name,
    //       last_name: this.state.last_name,
    //       password: this.state.password,
    //     },
    //   });
    // } else {
    //   this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    // }
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
            <Form onSubmit={this.registerUser}>

              {/* Username Field */}
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter Username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
              </Form.Group>

              {/* First Name Field */}
              <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter First Name"
                  value={this.state.first_name}
                  onChange={this.handleInputChangeFor('first_name')}
                />
              </Form.Group>

              {/* Last Name Field */}
              <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter Last Name"
                  value={this.state.last_name}
                  onChange={this.handleInputChangeFor('last_name')}
                />
              </Form.Group>

              {/* Email Field */}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor('email')}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              {/* Password Field */}
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')} 
                />
              </Form.Group>

              {/* Confirm Password Field */}
              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                  type="password" 
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

