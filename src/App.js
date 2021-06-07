/** @format */

import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "./HOC/auth";
import "./App.scss";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import SingleBlog from "./Components/SingleBlog";
import AdminDashboard from "./Components/AdminDashboard";
import ApproveUser from "./Components/ApproveUser";
import ApproveBlogToPost from "./Components/ApproveBlogToPost";
import CreateBlog from "./Pages/CreateBlog";
import WriterDashboard from "./Components/WriterDashboard";

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Auth(Home, null)} />
      <Route exact path='/login' component={Auth(Login, false)} />
      <Route exact path='/signup' component={Auth(Signup, false)} />
      <Route
        exact
        path='/singleblog/:slug'
        component={Auth(SingleBlog, null)}
      />
      <Route
        exact
        path='/admindashboard'
        component={Auth(AdminDashboard, null)}
      />
      <Route exact path='/approveUser' component={Auth(ApproveUser, null)} />
      <Route
        exact
        path='/approveposts'
        component={Auth(ApproveBlogToPost, null)}
      />
      <Route
        exact
        path='/writerdashboard'
        component={Auth(WriterDashboard, null)}
      />
      <Route exact path='/addblog' component={Auth(CreateBlog, true)} />
    </Switch>
  );
}

export default App;
