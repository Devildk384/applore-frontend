/** @format */

import React, { useEffect } from "react";
import { auth } from "../actions/user_actions";
import { useSelector, useDispatch } from "react-redux";
import cookie from "js-cookie";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (ComposedClass, reload, adminRoute = null) {
  const getCookie = (key) => {
    if (process.browser) {
      return cookie.get(key);
    }
  };

  const key = getCookie("jwt");

  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth(key)).then(async (response) => {
        if (await !response.payload.isAuth) {
          if (reload) {
            props.history.push("/login");
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (reload === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, [dispatch, props.history]);

    return <ComposedClass {...props} user={user} />;
  }
  return AuthenticationCheck;
}
