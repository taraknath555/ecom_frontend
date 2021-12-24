import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Row, Col, Form, Button } from "react-bootstrap";
import { fetchUserDetails, updateDetails } from "../actions/userAction";
import cleanup from "../actions/cleanupAction";

export class ProfileScreen extends Component {
  state = { name: "", email: "", profilePic: "" };
  async componentDidMount() {
    const { user } = this.props.userSignin || {};
    await this.props.fetchUserDetails(user && user.token);
    this.setUserInfo();
  }

  setUserInfo = () => {
    const { user, error } = this.props.userDetails;
    if (!error || user)
      this.setState({
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      });
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, email, profilePic } = this.state;
    this.props.updateDetails({
      name,
      email,
      profilePic,
    });
  };

  componentWillUnmount() {
    this.props.cleanup();
  }
  render() {
    const { loading, error, isUpdated } = this.props.userDetails;
    return (
      <Row>
        <Col md={4}>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {isUpdated && <Message>{"Updated Successfully"}</Message>}
          <h2>User Profile</h2>
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Group>
              <Form.Label className="my-2">Name</Form.Label>
              <Form.Control
                type="test"
                name="name"
                placeholder="Enter name"
                value={this.state.name}
                onChange={this.handleInputChange}
              ></Form.Control>
            </Form.Group>
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

            <Button className="my-3" type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </Col>

        <Col md={8}>
          <h2>My Orders</h2>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userSignin: state.userSignin,
    userDetails: state.userDetails,
  };
};

export default connect(mapStateToProps, {
  fetchUserDetails,
  updateDetails,
  cleanup,
})(ProfileScreen);
