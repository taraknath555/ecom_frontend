import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import { saveShippingAddress } from "../actions/cartAction";
import CheckoutSteps from "../components/CheckoutSteps";
import FormController from "../components/FormController";

export class ShippingScreen extends Component {
  state = {
    address: "",
    city: "",
    postalCode: "",
    country: "",
  };

  componentDidMount() {
    const {
      shippingAddress: { address, city, postalCode, country },
    } = this.props.cart;
    this.setState({ address, city, postalCode, country });
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.saveShippingAddress(this.state);
    this.props.history.push("/payment");
  };

  render() {
    return (
      <Fragment>
        <CheckoutSteps step1 step2 />
        <FormController>
          <h1>Shipping Screen</h1>
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Group>
              <Form.Label className="my-2">Address</Form.Label>
              <Form.Control
                name="address"
                type="text"
                placeholder="Enter Address"
                value={this.state.address}
                onChange={this.handleInputChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="my-2">City</Form.Label>
              <Form.Control
                name="city"
                type="city"
                placeholder="Enter city"
                value={this.state.city}
                onChange={this.handleInputChange}
              ></Form.Control>
            </Form.Group>

            <Row>
              <Form.Group as={Col}>
                <Form.Label className="my-2">Postal Code</Form.Label>
                <Form.Control
                  name="postalCode"
                  type="text"
                  placeholder="Enter Postal Code"
                  value={this.state.postalCode}
                  onChange={this.handleInputChange}
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label className="my-2">Country</Form.Label>
                <Form.Control
                  name="country"
                  type="text"
                  placeholder="Enter Country name"
                  value={this.state.country}
                  onChange={this.handleInputChange}
                ></Form.Control>
              </Form.Group>
            </Row>

            <Button className="my-3" type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </FormController>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { saveShippingAddress })(
  ShippingScreen
);
