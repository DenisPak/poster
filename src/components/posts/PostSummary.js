import React from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { Link } from "react-router-dom";
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
  },
  summaryContent: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  date: {
    marginLeft: "15px",
    cursor: "default",
  },
});

const PostSummary = ({ post }) => {
  const classes = useStyles();
  return (
    <div>
      <Paper elevation={0}>
        <Box padding="20px 20px 10px 20px">
          <Typography className={classes.meta} component="p">
            {post.category ? (
              <>
                <img src={post.category.optionImg} />
                {post.category.optionName}{" "}
              </>
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
      </Paper>
    </div>
  );
};

export default PostSummary;
