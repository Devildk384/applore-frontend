/** @format */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { auth, logoutUser } from "../actions/user_actions";
import { useDispatch, useSelector } from "react-redux";
import cookie from "js-cookie";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const [value, setValue] = useState("");

  const user = useSelector((state) => state.user);
  useEffect(() => {
    getUser();
  }, [user]);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { sections, title } = props;

  const getUser = () => {
    setValue(user.userData && user.userData.name);
  };

  const handleClick = (e) => {
    dispatch(logoutUser()).then((response) => {
      console.log(response);
      if (response) {
        window.localStorage.setItem("_id", null);
        cookie.set("jwt", null);
      }
    });
  };

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component='h1'
          variant='h5'
          color='inherit'
          align='center'
          noWrap
          className={classes.toolbarTitle}
        >
          <a href='/' style={{ textDecoration: "none" }}>
            {" "}
            {title}
          </a>
        </Typography>

        {user.userData && user.userData._id ? (
          <>
            <Typography
              component='h2'
              variant='h5'
              color='inherit'
              align='center'
              noWrap
              className={classes.toolbarTitle}
            >
              {user.userData && user.userData.name}
            </Typography>
            {user.userData && user.userData.role === "ADMIN" ? (
              <Button
                style={{ marginRight: "10px" }}
                href='/admindashboard'
                variant='outlined'
                size='small'
              >
                AdminDashboard
              </Button>
            ) : (
              <>
                {user.userData && user.userData.role === "CONTENT-WRITER" ? (
                  <>
                    {" "}
                    <Button
                      style={{ marginRight: "10px" }}
                      href='/writerdashboard'
                      variant='outlined'
                      size='small'
                    >
                      Content-Writer Dashboard
                    </Button>
                    <Button
                      style={{ marginRight: "10px" }}
                      href='/addblog'
                      variant='outlined'
                      size='small'
                    >
                      <AddIcon />
                      Create Blog
                    </Button>{" "}
                  </>
                ) : (
                  " "
                )}
              </>
            )}

            <Button
              onClick={handleClick}
              style={{ marginRight: "10px" }}
              href='/signup'
              variant='outlined'
              size='small'
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Button
              style={{ marginRight: "10px" }}
              href='/signup'
              variant='outlined'
              size='small'
            >
              Sign up
            </Button>
            <Button href='/login' variant='outlined' size='small'>
              Login
            </Button>
          </>
        )}
      </Toolbar>
      <Toolbar
        component='nav'
        variant='dense'
        className={classes.toolbarSecondary}
      ></Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
