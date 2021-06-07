/** @format */

import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import axios from "axios";
import { API } from "../config";
import SingleMainBlog from "./SingleMainBlog";

export default function SingleBlog(props) {
  const { slug } = props.match.params;
  console.log(slug);
  const [getBlog, setGetBlog] = useState([]);
  useEffect(() => {
    const fetchAllApprovedBlogs = async () => await getAllApproveBlogList();
    fetchAllApprovedBlogs();
  }, []);

  const getAllApproveBlogList = async () => {
    axios.get(`${API}/blog/${slug}`).then((response) => {
      if (response.data) {
        setGetBlog(response.data);
      } else {
        alert("Failed to fectch blogs data...");
      }
    });
  };

  console.log(getBlog.writer && getBlog.writer.role);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Header title='Applore Blogs' />
        <main>
          <SingleMainBlog
            title={getBlog.title}
            body={getBlog.body}
            image={"https://source.unsplash.com/random"}
            name={getBlog.writer && getBlog.writer.name}
            role={getBlog.writer && getBlog.writer.role}
          />
        </main>
      </Container>
    </React.Fragment>
  );
}
