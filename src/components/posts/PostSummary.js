import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { Link } from "react-router-dom";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";

import { changeBookmark } from "../../actions";

const useStyles = makeStyles({
  paper: {
    padding: "20px",
    display: "relative",
  },
  image: {
    width: "100%",
    marginBottom: "20px",
  },
  meta: {
    fontSize: "14px",
    cursor: "default",
  },
  summaryContent: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  date: {
    marginLeft: "15px",
    cursor: "default",
  },
  category: {
    marginRight: "15px",
  },
});

const PostSummary = ({ post, changeBookmark, profile }) => {
  const [bookmarked, setBookmarked] = useState(false);
  useEffect(() => {
    if (
      profile.bookmarks &&
      !bookmarked &&
      profile.bookmarks.some((bookmark) => post.id == bookmark)
    ) {
      setBookmarked(true);
    }
  }, [profile.bookmarks]);

  const onBookmarkedChange = () => {
    setBookmarked(!bookmarked);
    changeBookmark(!bookmarked, post.id);
  };
  const classes = useStyles();
  return (
    <div>
      <Paper elevation={0}>
        <Box padding="20px 20px 10px 20px">
          <Typography className={classes.meta} component="p">
            {post.category.optionName ? (
              <span className={classes.category}>
                <img src={post.category.optionImg} />
                {post.category.optionName}{" "}
              </span>
            ) : null}
            {`${post.authorFirstName} ${post.authorLastName} `}
            <span className={classes.date}>
              {moment(post.createdAt.toDate()).calendar()}
            </span>
          </Typography>
          <Link to={"post/" + post.id} style={{ textDecoration: "none" }}>
            <Paper elevation={0}>
              <Typography component="h5" variant="h5">
                {post.title}
              </Typography>
              {post.header ? (
                <Typography className={classes.summaryContent} component="p">
                  {post.header}
                </Typography>
              ) : null}
            </Paper>
          </Link>
        </Box>
        <Link to={"post/" + post.id}>
          {post.headerImg ? (
            <img className={classes.image} src={post.headerImg} alt="dsd" />
          ) : null}
        </Link>
        <Box padding="0 10px 10px 10px">
          {bookmarked ? (
            <IconButton
              onClick={() => onBookmarkedChange()}
              size="small"
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <BookmarkIcon />
            </IconButton>
          ) : (
            <IconButton
              size="small"
              aria-label="upload picture"
              component="span"
              onClick={() => onBookmarkedChange(true)}
            >
              <BookmarkBorderIcon />
            </IconButton>
          )}
        </Box>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps, { changeBookmark })(PostSummary);
