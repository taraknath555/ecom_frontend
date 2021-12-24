import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Card,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartAction";
import Message from "../components/Message";

export class CartScreen extends Component {
  componentDidMount() {
    const qty = Number(this.props.location.search.split("=")[1]);
    const id = this.props.match.params.id;
    if (id && qty) {
      this.props.addToCart(id, qty);
    }
  }

  removeCartHandler = (id) => {
    this.props.removeFromCart(id);
  };

  checkoutHandler = () => {
    this.props.history.push(`/signin?redirect=shipping`);
  };

  render() {
    return (
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {this.props.cartItems.length === 0 ? (
            <Message>
              Your Cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {this.props.cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={4}>
                      <Link
                        to={`/product/${item.product}`}
                        style={{ textDecoration: "none" }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Select
                        size="sm"
                        value={item.qty}
                        onChange={(e) =>
                          this.props.addToCart(
                            item.product,
                            Number(e.target.value)
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => this.removeCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item variant="flush">
                <h2>
                  Subtotal (
                  {this.props.cartItems.reduce(
                    (acc, item) => acc + item.qty,
                    0
                  )}
                  ) items
                </h2>
                $
                {this.props.cartItems
                  .reduce((acc, item) => acc + item.price * item.qty, 0)
                  .toFixed(2)}
              </ListGroup.Item>

              <ListGroup.Item>
                <div className="d-grid">
                  <Button
                    onClick={this.checkoutHandler}
                    className="btn-block"
                    type="button"
                    disabled={this.props.cartItems.length === 0}
                  >
                    Proceed To Checkout
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
  };
};

export default connect(mapStateToProps, { addToCart, removeFromCart })(
  CartScreen
);
