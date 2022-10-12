import { Component } from 'react';
import {
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Label,
  Input,
  Button,
} from 'reactstrap';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "../actions/type";
import { connect } from "react-redux";
import { register } from "../actions/auth-action";
import AuthService from "../services/auth.service";
//import './App.scss';

const ERROR = 'Uh oh! Looks like there is an issue with your email. Please input a correct email.'
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validate: {
        emailState: '',
        passwordState: '',
        nameState: '',
        phoneState: ''
      },
      roles: [],
      disabled: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, selectedRole) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    if (event.target.checked)
      this.setState({ roles: [...this.state.roles, selectedRole] })
    else
      this.setState({
        roles: this.state.roles.filter(function (role) {
          return role !== selectedRole
        })
      });

    this.setState({
      [name]: value,

    });

    if (this.state.validate.emailState === "has-success" && this.state.validate.nameState === "has-success"
      && this.state.validate.phoneState === "has-success")
      this.setState({
        disabled: false
      })
    else
      this.setState({
        disabled: true
      })
  };

  validateEmail(e) {
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const { validate } = this.state;

    if (emailRex.test(e.target.value)) {
      validate.emailState = 'has-success';
    } else {
      validate.emailState = 'has-danger';
    }

    this.setState({ validate });
  }

  validateName(e) {

    const { validate } = this.state;

    if (e.target.value) {
      validate.nameState = 'has-success';
    } else {
      validate.nameState = 'has-danger';
    }

    this.setState({ validate });
  }

  validatePhone(e) {

    const { validate } = this.state;

    // if (e.target.value && /[0-9]/.test(e.key)) {
    if (e.target.value && (e.target.value.match('[0-9]{10}'))) {
      validate.phoneState = 'has-success';
    } else {
      validate.phoneState = 'has-danger';
    }

    this.setState({ validate });
  }

  submitForm = (e) => {
    e.preventDefault();

    this.props
      .dispatch(
        register(
          this.state.username,
          this.state.email,
          this.state.password,
          this.state.phone,
          this.state.roles
        )
      )
      .then(() => {
        this.setState({
          successful: true,
        });
      })
      .catch(() => {
        this.setState({
          successful: false,
        });
      });
  }


  render() {
    const { email, password, username, phone } = this.state;

    const { message, error } = this.props;
    console.log(message, error, this.props)

    return (
      <div >
        <Form onSubmit={(e) => this.submitForm(e)} className="form-margin w-50">
          {error && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div className="alert alert-success" role="alert">
                {message}
              </div>
            </div>
          )}
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="example@example.com"
              valid={this.state.validate.emailState === "has-success"}
              invalid={this.state.validate.emailState === "has-danger"}
              value={email}
              onChange={(e) => {
                this.validateEmail(e);
                this.handleChange(e);
              }}
              onBlur={(e) => {
                this.validateEmail(e);
              }}
            />

            <FormFeedback>
              {ERROR}
            </FormFeedback>
            <FormFeedback valid>
              That's a good looking email you've got in there.
            </FormFeedback>
            <FormText>Your email is your username to log in.</FormText>
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="********"
              valid={this.state.validate.passwordState === "has-success"}
              invalid={this.state.validate.passwordState === "has-danger"}
              value={password}
              onChange={(e) => this.handleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="name"
              name="username"
              id="namee"
              placeholder="Your full name"
              valid={this.state.validate.nameState === "has-success"}
              invalid={this.state.validate.nameState === "has-danger"}
              value={username}
              onChange={(e) => {
                this.validateName(e);
                this.handleChange(e);
              }}
              onBlur={(e) => {
                this.validateName(e);
              }}
            />
            <FormFeedback>
              Name is required
            </FormFeedback>
            <FormFeedback valid>
              Nice name! Please go ahead and fill the form
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Input
              type="phone"
              name="phone"
              id="phone"
              placeholder="10 digit phone number"
              maxLength={10}
              valid={this.state.validate.phoneState === "has-success"}
              invalid={this.state.validate.phoneState === "has-danger"}
              value={phone}
              onChange={(e) => {
                this.validatePhone(e);
                this.handleChange(e);
              }}
              onBlur={(e) => {
                this.validatePhone(e);
              }}
            />
            <FormFeedback>
              Enter a 10 digit mobile number please, believe us we won't spam you.
            </FormFeedback>
            <FormFeedback valid>
              Looks good !!!
            </FormFeedback>
          </FormGroup>
          <FormGroup
            check
            inline
          >
            <Input type="checkbox" onChange={(e) => this.handleChange(e, 'admin')} />
            <Label check>
              Admin
            </Label>
          </FormGroup>
          <FormGroup
            check
            inline
          >
            <Input type="checkbox" onChange={(e) => this.handleChange(e, 'moderator')} />
            <Label check>
              Moderator
            </Label>
          </FormGroup>
          <FormGroup
            check
            inline
          >
            <Input type="checkbox" onChange={(e) => this.handleChange(e, 'user')} />
            <Label check>
              User
            </Label>
          </FormGroup>
          <Button disabled={this.state.disabled}>Submit</Button>
        </Form>
      </div >
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  const { message } = state.message;
  const { error } = state.error;
  return {
    message,
    error
  };
}

export default connect(mapStateToProps)(Register);