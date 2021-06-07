/** @format */

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import axios from "axios";
import { API } from "../config";
import AllUser from "./AllUser";
import cookie from "js-cookie";

export default function ApproveUser() {
  const getCookie = (key) => {
    if (process.browser) {
      return cookie.get(key);
    }
  };

  const token = getCookie("jwt");

  const [approveUsers, setApproveUsers] = useState([]);

  useEffect(() => {
    const fetchAllApproveUser = async () => await getAllApproveUser();
    fetchAllApproveUser();
  }, []);

  const getAllApproveUser = async () => {
    axios
      .get(`${API}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.data) {
          setApproveUsers(response.data);
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
            {approveUsers &&
              approveUsers.map((users, idx) => (
                <>
                  {users.role === "ADMIN" ? (
                    ""
                  ) : (
                    <AllUser
                      name={users.name}
                      id={users._id}
                      role={users.role}
                      email={users.email}
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
