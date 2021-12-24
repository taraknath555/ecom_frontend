import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/routing/PrivateRoute";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import CartScreen from "./screen/CartScreen";
import SigninScreen from "./screen/SigninScreen";
import SignupScreen from "./screen/SignupScreen";
import ProfileScreen from "./screen/ProfileScreen";
import UpdatePasswordScreen from "./screen/UpdatePasswordScreen";
import { Container } from "react-bootstrap";
import ShippingScreen from "./screen/ShippingScreen";
import PaymentScreen from "./screen/PaymentScreen";
import PlaceOrderScreen from "./screen/PlaceOrderScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/product/:id" exact component={ProductScreen} />
            <Route path="/cart/:id?" exact component={CartScreen} />
            <Route path="/signin" exact component={SigninScreen} />
            <Route path="/signup" exact component={SignupScreen} />
            <PrivateRoute
              path="/updatePassword"
              exact
              component={UpdatePasswordScreen}
            />
            <PrivateRoute path="/profile" exact component={ProfileScreen} />
            <PrivateRoute path="/shipping" exact component={ShippingScreen} />
            <PrivateRoute path="/payment" exact component={PaymentScreen} />
            <PrivateRoute
              path="/placeorder"
              exact
              component={PlaceOrderScreen}
            />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
