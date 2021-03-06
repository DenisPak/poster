import React from "react";
import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import moment from "moment";
import { Link } from "react-router-dom";

import Comments from "./Comments";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "100%",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    textAlign: "left",
    [theme.breakpoints.down("md")]: {
      borderRadius: 0,
    },
  },
  post: {
    paddingTop: "80px",
  },
  container: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },
  content: {
    maxWidth: "850px",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      maxWidth: "700px",
    },
  },
  image: {
    display: "inline-block",
    width: "100%",
    marginBottom: "20px",
  },
  meta: {
    fontSize: "14px",
    marginRight: "15px",
  },
  link: {
    color: "#000",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
}));

const Post = ({ post }) => {
  useFirestoreConnect([{ collection: "posts" }]);

  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      {post ? (
        <>
          <Paper elevation={0} className={`${classes.paper} ${classes.post}`}>
            <div className={classes.content}>
              <Typography className={classes.meta} component="p">
                {post.category.optionName !== "" ? (
                  <>
                    <img
                      src={post.category.optionImg}
                      alt="post.category.optionName"
                    />
                    <span className={classes.meta}>
                      {post.category.optionName}
                    </span>
                  </>
                ) : null}
                {
                  <span className={classes.meta}>
                    <Link
                      to={`/profile/${post.authorId}`}
                      className={classes.link}
                    >
                      {`${post.authorFirstName} ${post.authorLastName} `}
                    </Link>
                  </span>
                }
                <span className={classes.date}>
                  {moment(post.createdAt.toDate()).calendar()}
                </span>
              </Typography>
              <Typography component="h4" variant="h4">
                {post.title}
              </Typography>

              {post.header ? (
                <pre style={{ whiteSpace: "pre-wrap" }}>
                  <Typography component="p">{post.header}</Typography>
                </pre>
              ) : null}
              {post.headerImg ? (
                <img src={post.headerImg} alt="" className={classes.image} />
              ) : null}
              <pre style={{ whiteSpace: "pre-wrap" }}>
                <Typography component="p">{post.content}</Typography>
              </pre>
            </div>
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <div className={classes.content}>
              <Comments post={post} />
            </div>
          </Paper>
        </>
      ) : (
        <Typography style={{ marginTop: "64px" }} component="p">
          Post does not exist
        </Typography>
      )}
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => {
  if (state.firestore.ordered.posts) {
    return {
      post: state.firestore.ordered.posts.find(
        (post) => post.id === ownProps.match.params.id
      ),
    };
  } else return { post: null };
};

export default connect(mapStateToProps)(Post);
