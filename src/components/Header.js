import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signout } from "../actions/userAction";
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class Header extends Component {
  handleSignout = () => {
    this.props.signout();
    this.props.history.push("/signin");
  };

  render() {
    const { user } = this.props.userSignin || {};
    return (
      <header>
        <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Ecom</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav style={{ marginLeft: "auto" }}>
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i> Cart
                  </Nav.Link>
                </LinkContainer>
                {user ? (
                  <NavDropdown title={user.user.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/updatePassword">
                      <NavDropdown.Item>Change Password</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={this.handleSignout}>
                      Sign Out
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/signin">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign in
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userSignin: state.userSignin,
  };
};
export default withRouter(connect(mapStateToProps, { signout })(Header));
