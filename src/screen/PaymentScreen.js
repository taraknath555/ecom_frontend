import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Col, Form, Button } from "react-bootstrap";
import { savePaymentMethod } from "../actions/cartAction";
import CheckoutSteps from "../components/CheckoutSteps";
import FormController from "../components/FormController";

export class PaymentScreen extends Component {
  state = {
    paymentMethod: "PayPal",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.savePaymentMethod(this.state.paymentMethod);
    this.props.history.push("/placeorder");
  };

  render() {
    return (
      <Fragment>
        <CheckoutSteps step1 step2 step3 />
        <FormController>
          <h1>Payment Method</h1>
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Group>
              <Form.Label as="legend">Select Payment Method</Form.Label>
              <Col>
                <Form.Check
                  type="radio"
                  name="paymentMethod"
                  label="PayPal or Credit Card"
                  id="PayPal"
                  value="PayPal"
                  checked
                  onChange={(e) => {
                    this.setState({ paymentMethod: e.target.value });
                  }}
                ></Form.Check>

                <Form.Check
                  type="radio"
                  name="paymentMethod"
                  label="Stripe"
                  id="Stripe"
                  value="Stripe"
                  onChange={(e) => {
                    this.setState({ paymentMethod: e.target.value });
                  }}
                ></Form.Check>
              </Col>
            </Form.Group>

            <Button className="my-3" type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </FormController>
      </Fragment>
    );
  }
}

export default connect(null, { savePaymentMethod })(PaymentScreen);
