/** @format */

import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    height: "400px",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },

  mainFeaturedPostContent: {
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

export default function SingleMainBlog({
  title,
  body,
  image,
  slug,
  name,
  role,
}) {
  const classes = useStyles();

  return (
    <>
      <Paper
        className={classes.mainFeaturedPost}
        style={{ backgroundImage: `${image}` }}
      >
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: "none" }} src={image} alt={image} />}
        <div />
      </Paper>

      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography
              component='h1'
              variant='h3'
              color='inherit'
              gutterBottom
            >
              {title}
            </Typography>
            <Typography variant='h5' color='inherit' paragraph>
              {body}
            </Typography>
            <Typography variant='h5' color='inherit' paragraph>
              by {name}
            </Typography>
            <Typography variant='h5' color='inherit' paragraph>
              {role}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

SingleMainBlog.propTypes = {
  post: PropTypes.object,
};
