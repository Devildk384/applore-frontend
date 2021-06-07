/** @format */

import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";
import cookie from "js-cookie";

import axios from "axios";
import { API } from "../config";
import { useSelector } from "react-redux";

import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import AllPosts from "./AllPosts";

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  mainText: {
    textAlign: "center",
  },
});
export default function WriterDashboard() {
  const userid = useSelector((state) => state.user && state.user.userData);
  const userID = userid && userid._id;
  const getCookie = (key) => {
    if (process.browser) {
      return cookie.get(key);
    }
  };

  const token = getCookie("jwt");

  const classes = useStyles();
  const [allBlogsbyWriter, setAllBlogsbyWriter] = useState("");

  useEffect(() => {
    const fetchAllallBlogsbyWriter = async () => await getAllApproveBlogList();
    fetchAllallBlogsbyWriter();
  }, []);

  const getAllApproveBlogList = async () => {
    axios
      .get(`${API}/user/blogs/${userID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          setAllBlogsbyWriter(response.data);
        } else {
          alert("Failed to fectch blogs data...");
        }
      });
  };

  console.log(allBlogsbyWriter);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Header title='Applore Blogs' />
        <main>
          <Grid container spacing={4} className={classes.mainText}>
            <Typography
              style={{ textTransform: "uppercase" }}
              component='h2'
              variant='h5'
            >
              Content Writer
            </Typography>

            {allBlogsbyWriter &&
              allBlogsbyWriter.map((post, idx) => (
                <AllPosts
                  approvedbyAdmin={post.approvedbyAdmin}
                  title={post.title}
                  id={post._id}
                  body={post.body}
                  slug={post.slug}
                  token={token}
                />
              ))}
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}
