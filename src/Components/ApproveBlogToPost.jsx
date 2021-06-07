/** @format */

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import axios from "axios";
import { API } from "../config";
import cookie from "js-cookie";
import AllPosts from "./AllPosts";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

export default function ApproveBlogToPost() {
  const getCookie = (key) => {
    if (process.browser) {
      return cookie.get(key);
    }
  };

  const token = getCookie("jwt");
  const [approvedBlogs, setApprovedBlogs] = useState("");

  useEffect(() => {
    const fetchAllApprovedBlogs = async () => await getAllApproveBlogList();
    fetchAllApprovedBlogs();
  }, []);

  const getAllApproveBlogList = async () => {
    axios
      .get(`${API}/allblogs`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          setApprovedBlogs(response.data);
        } else {
          alert("Failed to fectch blogs data...");
        }
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Header title='Applore Blogs' />
        <main>
          <Grid container spacing={4}>
            {approvedBlogs &&
              approvedBlogs.map((post, idx) => (
                <>
                  {post.approvedbyAdmin === true ? (
                    " "
                  ) : (
                    <AllPosts
                      approvedbyAdmin={post.approvedbyAdmin}
                      title={post.title}
                      id={post._id}
                      body={post.body}
                      slug={post.slug}
                      name={!post.writer ? " User Deleted" : post.writer.name}
                      role={!post.writer ? " User Deleted" : post.writer.name}
                      token={token}
                    />
                  )}
                </>
              ))}
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}
