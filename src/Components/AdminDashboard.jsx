/** @format */

import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import { API } from "../config";
import AllUser from "./AllUser";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

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
export default function AdminDashboard() {
  const classes = useStyles();

  const [approvedBlogs, setApprovedBlogs] = useState("");

  useEffect(() => {
    const fetchAllApprovedBlogs = async () => await getAllApproveBlogList();
    fetchAllApprovedBlogs();
  }, []);

  const getAllApproveBlogList = async () => {
    axios.get(`${API}/blogs`).then((response) => {
      if (response.data) {
        setApprovedBlogs(response.data);
      } else {
        alert("Failed to fectch blogs data...");
      }
    });
  };

  console.log(approvedBlogs);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Header title='Applore Blogs' />
        <main>
          <div container className={classes.mainText}>
            <Typography
              style={{ textTransform: "uppercase" }}
              component='h2'
              variant='h5'
            >
              Admin Update Dashboard
            </Typography>
            <Link to='approveposts' style={{ textDecoration: "none" }}>
              <CardActionArea style={{ marginTop: "80px" }} component='a'>
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography
                        style={{ textTransform: "uppercase" }}
                        component='h2'
                        variant='h5'
                      >
                        Approved User Posts or Delete Users Posts
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              </CardActionArea>
            </Link>
            <Link to='approveUser' style={{ textDecoration: "none" }}>
              <CardActionArea
                style={{ marginTop: "80px" }}
                component='a'
                href='#'
              >
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography
                        style={{ textTransform: "uppercase" }}
                        component='h2'
                        variant='h5'
                      >
                        {" "}
                        Approved User for Content Writer and delete User
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              </CardActionArea>
            </Link>
          </div>
        </main>
      </Container>
    </React.Fragment>
  );
}
