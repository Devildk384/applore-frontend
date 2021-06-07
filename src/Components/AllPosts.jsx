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
  CardActionArea,
  CardActions,
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
    maxWidth: 345,
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
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function AllPosts({
  id,
  body,
  slug,
  approvedbyAdmin,
  title,
  token,
}) {
  console.log(approvedbyAdmin);
  const classes = useStyles();

  const [value, setvalue] = useState("");

  const deleteUser = () => {
    axios
      .delete(`${API}/blog/${slug}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        if (response) {
          alert("Blog Deleted successfully...");
          window.location.reload();
        } else {
          alert("Unable to Delete this Blog...");
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
        `${API}/approveblog/${slug}`,
        { approvedbyAdmin: value },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        if (response) {
          alert("Blog Approved  Succesfully...");
          window.location.reload();
        } else {
          alert("Unable to Approve Blog...");
        }
      });
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='Contemplative Reptile'
          height='140'
          image={"https://source.unsplash.com/random"}
          title='Contemplative Reptile'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton aria-label='delete User' onClick={deleteUser}>
          <DeleteIcon className={classes.playIcon} />
        </IconButton>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Approve This Post</FormLabel>
          <RadioGroup
            aria-label='changeUser'
            name='changeUser1'
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value='true'
              control={<Radio />}
              label='Approved this Blog'
            />
          </RadioGroup>

          <Button onClick={updateUserType}>Submit</Button>
        </FormControl>
      </CardActions>
    </Card>
  );
}
