import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? <Redirect to="/signin" /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = (state) => {
  return { user: state.userSignin };
};

export default connect(mapStateToProps)(PrivateRoute);
