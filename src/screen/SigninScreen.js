import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { signin } from "../actions/userAction";
import cleanup from "../actions/cleanupAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormController from "../components/FormController";

class SigninScreen extends Component {
  state = { email: "", password: "" };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.signin({ email, password });
  };

  componentWillUnmount() {
    this.props.cleanup();
  }

  render() {
    const { loading, error, user } = this.props.userSignin || {};
    const redirect = this.props.location.search
      ? this.props.location.search.split("=")[1]
      : "/";
    if (user) {
      this.props.history.push(redirect);
    }

    return (
      <FormController>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        <h1>Sign In</h1>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group>
            <Form.Label className="my-2">Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleInputChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label className="my-2">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleInputChange}
            ></Form.Control>
          </Form.Group>

          <Button className="my-3" type="submit" variant="primary">
            Sign In
          </Button>
        </Form>

        <Row>
          <Col>
            New Customer ?{" "}
            <Link
              to={
                this.state.redirect
                  ? `/signup?redirect=${this.state.redirect}`
                  : "/signup"
              }
            >
              Sign Up
            </Link>
          </Col>
        </Row>
      </FormController>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userSignin: state.userSignin,
  };
};

export default connect(mapStateToProps, {
  signin,
  cleanup,
})(SigninScreen);
