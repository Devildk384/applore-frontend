/** @format */

import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { API } from "../config";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginRight: "50px",
    marginTop: "50px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 351,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function AllUser({ name, id, role, email, token }) {
  const classes = useStyles();

  const [value, setvalue] = useState("");

  const deleteUser = () => {
    axios
      .delete(`${API}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        if (response) {
          alert("User Deleted successfully...");
          window.location.reload();
        } else {
          alert("Unable to Delete this user...");
        }
      });
  };

  const handleChange = (e) => {
    setvalue(e.currentTarget.value);
  };
  console.log(value);

  const updateUserType = () => {
    console.log({ role: value });
    axios
      .put(
        `${API}/user-role/${id}`,
        { role: value },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        if (response) {
          alert("User Type Updated Succesfully...");
          window.location.reload();
        } else {
          alert("Unable to Update User...");
        }
      });
  };

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component='h5' variant='h5'>
            {name}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {email}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {role}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label='delete User' onClick={deleteUser}>
            <DeleteIcon className={classes.playIcon} />
          </IconButton>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Change User Type</FormLabel>
            <RadioGroup
              aria-label='changeUser'
              name='changeUser1'
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value='ADMIN'
                control={<Radio />}
                label='ADMIN'
              />
              <FormControlLabel
                value='CONTENT-WRITER'
                control={<Radio />}
                label='CONTENT-WRITER'
              />
            </RadioGroup>

            <Button onClick={updateUserType}>Submit</Button>
          </FormControl>
        </div>
      </div>

      <Avatar style={{ marginTop: "20px", marginRight: "30px" }} />
    </Card>
  );
}
