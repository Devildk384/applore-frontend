/** @format */

import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import cookie from "js-cookie";
import { registerUser } from "../actions/user_actions";

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

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [formSuccessMessage, setFormSuccessMessage] = useState("");

  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    showForm: true,
  });
  const { name, email, password, error, loading } = value;

  const handleChange = (name) => (e) => {
    setValue({ ...value, error: false, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue({ ...value, loading: true, error: false });

    const dataToSubmit = { name, email, password };

    dispatch(registerUser(dataToSubmit))
      .then((response) => {
        console.log(response);
        setValue({ ...value, error: false, name: "", email: "", password: "" });
        setFormSuccessMessage("Account Created Successfully. Please Sign in");
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
        <Grid item xs={false} sm={4} md={7} className={classes.imagetext}>
          Welcome to Applore blog
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign Up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='name'
              label='Enter your name '
              name='name'
              onChange={handleChange("name")}
              value={name}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              onChange={handleChange("email")}
              value={email}
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              onChange={handleChange("password")}
              value={password}
              autoComplete='current-password'
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign Up
            </Button>

            <Grid container>
              <Grid item>
                <Link href='/login' variant='body2'>
                  {"Already have an account? Login "}
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

            {formSuccessMessage && (
              <label>
                <p
                  style={{
                    color: "c",
                    fontSize: "0.7rem",
                    border: "1px solid",
                    padding: "1rem",
                    borderRadius: "10px",
                  }}
                >
                  {formSuccessMessage}
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
