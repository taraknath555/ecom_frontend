import { RESET_STORE } from "../constants/globalConstants";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNOUT,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_FAIL,
  USER_UPDATE_DETAILS_SUCCESS,
} from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case USER_SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    case USER_SIGNOUT:
      return {};
    case RESET_STORE:
      return {
        ...state,
        loading: undefined,
        error: undefined,
      };

    default:
      return state;
  }
};

export const userSignupreducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    case USER_SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    case RESET_STORE:
      return {
        ...state,
        loading: undefined,
        error: undefined,
      };
    default:
      return state;
  }
};

export const userUpdatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PASSWORD_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_PASSWORD_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case USER_UPDATE_PASSWORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case RESET_STORE:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
    case USER_UPDATE_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: action.payload.user };
    case USER_DETAILS_FAIL:
    case USER_UPDATE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_UPDATE_DETAILS_SUCCESS:
      return {
        loading: false,
        isUpdated: true,
        user: action.payload.user,
      };

    case RESET_STORE:
      return {};
    default:
      return state;
  }
};
