import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { fetchProductDetails } from "../actions/productAction";

class ProductScreen extends Component {
  state = { qty: 1 };

  componentDidMount() {
    this.props.fetchProductDetails(this.props.match.params.id);
  }

  onSubmitHandler = () => {
    this.props.history.push(
      `/cart/${this.props.match.params.id}?qty=${this.state.qty}`
    );
  };

  render() {
    const { loading, error, product } = this.props.productDetails || {};
    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          product && (
            <Fragment>
              <Link to="/" className="btn btn-light">
                Go Back
              </Link>
              <Row>
                <Col md={6}>
                  <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                  <ListGroup>
                    <ListGroup.Item>
                      <h4>{product.name}</h4>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>Price: {product.price}</ListGroup.Item>
                    <ListGroup.Item>
                      Description: {product.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                <Col md={3}>
                  <Card>
                    <ListGroup>
                      <ListGroup.Item>
                        <Row>
                          <Col md={4}>Price </Col>
                          <Col md={8}>${product.price} </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col md={4}>Status </Col>
                          <Col md={8}>
                            {product.countInStock ? "In Stock" : "Out of Stock"}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Qty</Col>
                            <Col>
                              <Form.Select
                                size="sm"
                                value={this.state.qty}
                                onChange={(e) =>
                                  this.setState({ qty: e.target.value })
                                }
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </Form.Select>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}

                      <ListGroup.Item>
                        <Row>
                          <Button
                            onClick={this.onSubmitHandler}
                            className="btn-block"
                            type="button"
                            disabled={product.countInStock === 0}
                          >
                            Add To Cart
                          </Button>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            </Fragment>
          )
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { productDetails: state.productDetails };
};

export default connect(mapStateToProps, {
  fetchProductDetails,
})(ProductScreen);
