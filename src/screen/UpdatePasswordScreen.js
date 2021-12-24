import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { updatePassword } from "../actions/userAction";
import cleanup from "../actions/cleanupAction";
import FormController from "../components/FormController";
import Loader from "../components/Loader";
import Message from "../components/Message";

export class UpdatePasswordScreen extends Component {
  state = { currentPassword: "", newPassword: "", newPasswordConfirm: "" };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { currentPassword, newPassword, newPasswordConfirm } = this.state;
    const { user } = this.props.userSignin || {};
    this.props.updatePassword(
      {
        currentPassword,
        newPassword,
        newPasswordConfirm,
      },
      user && user.token
    );
  };

  componentWillUnmount() {
    this.props.cleanup();
  }

  render() {
    let { loading, error, message } = this.props.userUpdatePassword || {};
    if (message) {
      setTimeout(() => {
        this.props.history.push("/");
      }, 1500);
    }
    return (
      <Fragment>
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
        <FormController>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {message && <Message>{message}</Message>}
          <h1>Update Password</h1>
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Group>
              <Form.Label className="my-2">Current Password</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                placeholder="Enter Current Password"
                value={this.state.currentPassword}
                onChange={this.handleInputChange}
              ></Form.Control>
            </Form.Group>

            <Row>
              <Form.Group as={Col}>
                <Form.Label className="my-2">New Password</Form.Label>
                <Form.Control
                  name="newPassword"
                  type="password"
                  placeholder="Enter New Password"
                  value={this.state.newPassword}
                  onChange={this.handleInputChange}
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label className="my-2">Confirm Password</Form.Label>
                <Form.Control
                  name="newPasswordConfirm"
                  type="password"
                  placeholder="Confirm New Password"
                  value={this.state.newPasswordConfirm}
                  onChange={this.handleInputChange}
                ></Form.Control>
              </Form.Group>
            </Row>

            <Button className="my-3" type="submit" variant="primary">
              Update Password
            </Button>
          </Form>
        </FormController>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userUpdatePassword: state.userUpdatePassword,
    userSignin: state.userSignin,
  };
};

export default connect(mapStateToProps, { updatePassword, cleanup })(
  UpdatePasswordScreen
);
