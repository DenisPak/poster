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
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

import { changeBookmark, openModal } from "../../actions";
import Comment from "./Comment";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
    display: "relative",
  },
  image: {
    width: "100%",
    marginTop: "10px",
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
  commentButton: {
    display: "flex",
    alignItems: "center",
    marginTop: "2px",
    marginRight: "10px",
    gap: "5px",
    color: "rgba(0, 0, 0, 0.54);",
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
}));

const PostSummary = ({
  post,
  changeBookmark,
  profile,
  comment,
  auth,
  openModal,
}) => {
  const [bookmarked, setBookmarked] = useState(false);
  useEffect(() => {
    if (
      profile.bookmarks &&
      profile.bookmarks.some((bookmark) => post.id == bookmark)
    ) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
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
        <Box padding="20px 20px 0 20px">
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
          <Link to={"/post/" + post.id} style={{ textDecoration: "none" }}>
            <Paper elevation={0}>
              <Typography component="h5" variant="h5">
                {post.title}
              </Typography>
              {comment ? (
                <Comment comment={comment} />
              ) : post.header ? (
                <Typography className={classes.summaryContent} component="p">
                  {post.header}
                </Typography>
              ) : null}
            </Paper>
          </Link>
        </Box>
        {comment ? null : (
          <Link to={"/post/" + post.id}>
            {post.headerImg ? (
              <img className={classes.image} src={post.headerImg} alt="dsd" />
            ) : null}
          </Link>
        )}
        {comment ? null : (
          <Box padding="10px 20px 12px 20px" display="flex" alignItems="center">
            <Link to={"/post/" + post.id} style={{ textDecoration: "none" }}>
              <div className={classes.commentButton}>
                <ChatBubbleOutlineIcon />
                <Typography component="p">
                  {` ${post.comments ? post.comments.length : null}`}
                </Typography>
              </div>
            </Link>
            {bookmarked ? (
              <IconButton
                onClick={() => onBookmarkedChange()}
                size="small"
                color="primary"
                component="span"
              >
                <BookmarkIcon />
              </IconButton>
            ) : (
              <IconButton
                size="small"
                component="span"
                onClick={auth.isEmpty ? openModal : onBookmarkedChange}
              >
                <BookmarkBorderIcon />
              </IconButton>
            )}
          </Box>
        )}
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps, { changeBookmark, openModal })(
  PostSummary
);
