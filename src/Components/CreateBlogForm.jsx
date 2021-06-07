/** @format */

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import cookie from "js-cookie";
import Header from "./Header";
import { Container, TextareaAutosize } from "@material-ui/core";
import axios from "axios";
import { API } from "../config";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
  },

  paper: {
    width: "100%",
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

export default function CreateBlogForm(props) {
  const userid = useSelector((state) => state.user && state.user.userData);
  const _id = userid && userid._id;

  console.log(_id);

  const getCookie = (key) => {
    if (process.browser) {
      return cookie.get(key);
    }
  };

  const token = getCookie("jwt");

  console.log(token);

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [formSuccessMessage, setFormSuccessMessage] = useState("");
  const [value, setValue] = useState({
    title: "",
    body: "",
    error: "",
    loading: false,
    showForm: true,
  });
  const { title, body, error, loading } = value;

  const handleChange = (name) => (e) => {
    setValue({ ...value, error: false, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue({ ...value, loading: true, error: false });
    const writer = { _id };
    const dataToSubmit = { title, body, writer };
    console.log(dataToSubmit);
    axios
      .post(`${API}/user/blog`, dataToSubmit, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setValue({ ...value, error: false, title: "", body: "" });
        setFormSuccessMessage("Blog Created Successfully.");
      })
      .catch((err) => {
        setFormErrorMessage("Please review your profile");
        setTimeout(() => {
          setFormErrorMessage("");
        }, 3000);
      });
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Header title='Applore Blogs' />
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <div className={classes.paper}>
            <Typography component='h1' variant='h5'>
              Add New Blog
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                onChange={handleChange("title")}
                value={title}
                name='Create the Title'
                label='Create the Title'
                type='text'
              />

              <TextareaAutosize
                variant='outlined'
                margin='normal'
                required
                onChange={handleChange("body")}
                value={body}
                fullWidth
                style={{
                  width: "100%",
                  height: "200px",
                  variant: "outline",
                  fontSize: "18px",
                }}
                aria-label='Input textarea'
                placeholder='Input Body'
              />

              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Submit Blog
              </Button>

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
                      color: "##1dba44",
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
            </form>
          </div>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
