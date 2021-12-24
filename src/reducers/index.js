import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { productListReducer, productDetailsReducer } from "./productReducer";
import {
  userDetailsReducer,
  userSigninReducer,
  userSignupreducer,
  userUpdatePasswordReducer,
} from "./userReducer";

export default combineReducers({
  productsList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupreducer,
  userUpdatePassword: userUpdatePasswordReducer,
  userDetails: userDetailsReducer,
});
