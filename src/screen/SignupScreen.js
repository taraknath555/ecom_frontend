import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { signup } from "../actions/userAction";
import cleanup from "../actions/cleanupAction";
import FormController from "../components/FormController";
import Loader from "../components/Loader";
import Message from "../components/Message";

export class SignupScreen extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "user",
    redirect: "/",
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, passwordConfirm, role } = this.state;
    this.props.signup({ name, email, password, passwordConfirm, role });
  };

  componentWillUnmount() {
    this.props.cleanup();
  }

  render() {
    const { loading, error, user } = this.props.userSignup;
    const redirect = this.props.location.search
      ? this.props.location.search.split("=")
      : "/";
    if (user) {
      this.props.history.push(redirect);
    }
    return (
      <FormController>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        <h1>Sign Up</h1>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group>
            <Form.Label className="my-2">Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter name"
              value={this.state.name}
              onChange={this.handleInputChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label className="my-2">Email Address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleInputChange}
            ></Form.Control>
          </Form.Group>

          <Row>
            <Form.Group as={Col}>
              <Form.Label className="my-2">Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={this.handleInputChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label className="my-2">Confirm Password</Form.Label>
              <Form.Control
                name="passwordConfirm"
                type="password"
                placeholder="Confirm Password"
                value={this.state.passwordConfirm}
                onChange={this.handleInputChange}
              ></Form.Control>
            </Form.Group>
          </Row>

          <Form.Group>
            <Form.Label className="my-2">Role</Form.Label>
            <Form.Select
              name="role"
              value={this.state.role}
              onChange={this.handleInputChange}
            >
              {["User", "Admin"].map((option) => (
                <option key={option.toLowerCase()} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button className="my-3" type="submit" variant="primary">
            Sign Up
          </Button>
        </Form>

        <Row>
          <Col>
            Have an Account ?{" "}
            <Link
              to={
                this.state.redirect
                  ? `/signin?redirect=${this.state.redirect}`
                  : "/signin"
              }
            >
              Sign In
            </Link>
          </Col>
        </Row>
      </FormController>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userSignup: state.userSignup,
  };
};

export default connect(mapStateToProps, { signup, cleanup })(SignupScreen);
