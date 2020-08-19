import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";

//moment(post.createdAt.toDate()).calendar()
const useStyles = makeStyles((theme) => ({
  comment: {
    display: "flex",
    flexDirection: "column",
    padding: "15px 0 15px 0",
  },
  commentHeader: {
    marginBottom: "15px",
    display: "flex",
  },
  commentMeta: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "10px",
  },
  date: {
    fontSize: "12px",
  },
}));

const Comment = ({ comment }) => {
  const classes = useStyles();
  console.log(comment);
  return (
    <div className={classes.comment}>
      {comment ? (
        <>
          <div className={classes.commentHeader}>
            <Avatar variant="rounded" className={classes.rounded}>
              {comment.initials}
            </Avatar>
            <div className={classes.commentMeta}>
              <Typography>
                <b>{`${comment.firstName} ${comment.lastName}`}</b>
              </Typography>
              <span className={classes.date}>
                {moment(comment.createdAt.toDate()).calendar()}
              </span>
            </div>
          </div>
          <div className={classes.commentText}>
            <Typography component="p">{comment.comment}</Typography>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Comment;
