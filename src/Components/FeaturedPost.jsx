/** @format */

import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";

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
});

export default function FeaturedPost({
  key,
  title,
  image,
  body,
  slug,
  name,
  role,
}) {
  const classes = useStyles();
  console.log(slug);

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component='a' href='#'>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography
                style={{ textTransform: "uppercase" }}
                component='h2'
                variant='h5'
              >
                {title}
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                {body}
              </Typography>
              <Typography variant='subtitle1' color='#eeeeee'>
                by {name}
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                {role}
              </Typography>

              <a
                style={{ textDecoration: "none" }}
                href={`/singleblog/${slug}`}
                variant='subtitle1'
                color='primary'
              >
                Continue reading...
              </a>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia
              className={classes.cardMedia}
              image={image}
              // title={post.imageTitle}
            />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
