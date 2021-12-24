import axios from "axios";
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
  USER_UPDATE_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_FAIL,
} from "../constants/userConstants";

export const signin = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SIGNIN_REQUEST,
    });

    const body = { ...formData };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/users/signin", body, config);
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify({ user: data }));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const signup = (formValues) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });
    const body = { ...formValues };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/users/signup", body, config);
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify({ user: data }));
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const signout = () => (dispatch, getState) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_SIGNOUT });
};

export const updatePassword = (formValues, token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_PASSWORD_REQUEST,
    });
    const body = { ...formValues };
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token && `Bearer ${token}`,
      },
    };
    const { data } = await axios.patch(
      "/api/v1/users/updatePassword",
      body,
      config
    );
    dispatch({
      type: USER_UPDATE_PASSWORD_SUCCESS,
      payload: "Password Updated Successfully",
    });

    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify({ user: data }));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PASSWORD_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const fetchUserDetails = (token) => async (dispatch) => {
  dispatch({ type: USER_DETAILS_REQUEST });
  try {
    const config = {
      headers: {
        Content_type: "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/v1/users/me`, config);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const updateDetails = (formValues) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_DETAILS_REQUEST });
    const token = getState().userSignin.user.token;
    const body = { ...formValues };
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.patch("/api/v1/users/updateMe", body, config);
    dispatch({
      type: USER_UPDATE_DETAILS_SUCCESS,
      payload: data,
    });

    //To update the signin store value
    const signinData = { status: data.status, token, user: data.user };
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: signinData,
    });
    localStorage.setItem("userInfo", JSON.stringify({ user: signinData }));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_DETAILS_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.reponse.data,
    });
  }
};
