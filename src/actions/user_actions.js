/** @format */

import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "./types";
import { API } from "../config";

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${API}/signup`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${API}/signin`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth(token) {
  const request = axios
    .get(`${API}/auth`, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios.get(`${API}/signout`).then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}
