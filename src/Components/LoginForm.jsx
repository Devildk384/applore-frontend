/** @format */

import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { loginUser } from "../actions/user_actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import cookie from "js-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    "@media (max-width: 767px)": {
      display: "none",
    },
  },
  imagetext: {
    zIndex: "5",
    textAlign: "center",
    color: "#ffffff",
    elevation: "5",
    fontSize: "70px",
    fontWeight: "700",
    marginTop: "30%",
    textShadow: "2px 2px #FF0000",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialEmail = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [value, setValue] = useState({
    email: initialEmail,
    password: "",
    error: "",
    loading: false,
    showForm: true,
  });
  const { email, password, error, loading } = value;

  const handleChange = (name) => (e) => {
    setValue({ ...value, error: false, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue({ ...value, loading: true, error: false });

    const dataToSubmit = { email, password };

    dispatch(loginUser(dataToSubmit))
      .then((response) => {
        console.log(response);
        console.log(response.payload.user._id);
        if (response.payload) {
          window.localStorage.setItem("_id", response.payload.user._id);
          cookie.set("jwt", response.payload.token, {
            expires: 1,
          });
          if (rememberMe === true) {
            console.log(rememberMe);
            console.log(value);

            window.localStorage.setItem("rememberMe", value.email);
          } else {
            localStorage.removeItem("rememberMe");
          }

          history.push("/");
          window.location.reload();
        } else {
          setFormErrorMessage("Check out your Account or Password again");
        }
      })
      .catch((err) => {
        setFormErrorMessage("Check out your Account or Password again");
        setTimeout(() => {
          setFormErrorMessage("");
        }, 3000);
      });
  };

  const classes = useStyles();

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <div className={classes.imagetext}>Welcome to Applore blog</div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              onChange={handleChange("email")}
              value={email}
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              onChange={handleChange("password")}
              value={password}
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />

            <FormControlLabel
              control={
                <Checkbox
                  id='rememberMe'
                  onChange={handleRememberMe}
                  checked={rememberMe}
                  color='primary'
                />
              }
              label='Remember me'
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href='/signup' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {formErrorMessage && (
              <label>
                <p
                  style={{
                    color: "#ff0000bf",
                    fontSize: "0.7rem",
                    border: "1px solid",
                    padding: "1rem",
                    borderRadius: "10px",
                  }}
                >
                  {formErrorMessage}
                </p>
              </label>
            )}

            <Box mt={5}></Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
