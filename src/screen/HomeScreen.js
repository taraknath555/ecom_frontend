import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { fetchProductsList } from "../actions/productAction";
import Product from "../components/Product";
import Loader from "../components/Loader";
import { Row, Col } from "react-bootstrap";

class ProductScreen extends Component {
  componentDidMount() {
    this.props.fetchProductsList();
  }

  render() {
    const { products, loading, error } = this.props.productsList || {};
    return (
      <Fragment>
        <h1>Latest Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <h4>{error}</h4>
        ) : (
          <Row>
            {products &&
              products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { productsList: state.productsList };
};

export default connect(mapStateToProps, {
  fetchProductsList,
})(ProductScreen);
