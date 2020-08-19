import React from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import moment from "moment";
import { isLoaded, isEmpty } from "react-redux-firebase/lib/utils";

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
}));

const Post = ({ post }) => {
  useFirestoreConnect([{ collection: "posts" }]);
  console.log(post);
  const classes = useStyles();
  // if (!isLoaded(post)) {
  //   return <span>Loading...</span>;
  // }
  return (
    <Container maxWidth="lg" className={classes.container}>
      {post ? (
        <>
          <Paper elevation={0} className={`${classes.paper} ${classes.post}`}>
            <div className={classes.content}>
              <Typography className={classes.meta} component="p">
                {post.category.optionName != "" ? (
                  <>
                    <img src={post.category.optionImg} />
                    <span className={classes.meta}>
                      {post.category.optionName}
                    </span>
                  </>
                ) : null}
                {
                  <span className={classes.meta}>
                    {`${post.authorFirstName} ${post.authorLastName} `}
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
        "wait"
      )}
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => {
  if (state.firestore.ordered.posts) {
    return {
      post: state.firestore.ordered.posts.find(
        (post) => post.id == ownProps.match.params.id
      ),
    };
  } else return { post: null };
};

export default connect(mapStateToProps)(Post);
