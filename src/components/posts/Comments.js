import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Comment from "./Comment";
import InputAdornment from "@material-ui/core/InputAdornment";
import { v4 } from "uuid";
import { connect } from "react-redux";

import { addComment, openModal } from "../../actions";

const Comments = (props) => {
  const [comment, setComment] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setComment("");
    props.addComment(props.post, {
      uid: props.auth.uid,
      firstName: props.profile.firstName,
      lastName: props.profile.lastName,
      initials: props.profile.initials,
      postId: props.post.id,
      comment,
      createdAt: new Date(),
      commentId: v4(),
    });
  };

  const handleUnsignedComment = () => {
    if (!props.auth.uid) document.activeElement.blur();
    props.openModal();
  };

  return (
    <div style={{ textAlign: "left", width: "100%" }}>
      <Typography component="h6" variant="h6">
        {props.post.comments.length} comments
      </Typography>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          multiline
          fullWidth
          variant="outlined"
          placeholder="Write your comment"
          value={comment}
          onClick={handleUnsignedComment}
          onChange={(e) => setComment(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment style={{ margin: "auto 0 8.5px 0" }}>
                <Button
                  variant="contained"
                  disableElevation
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </InputAdornment>
            ),
            style: {
              fontSize: 15,
              marginTop: "20px",
              marginBottom: "20px",
            },
          }}
        />
      </form>

      {props.post.comments.map((comment) => {
        return <Comment key={comment.commentId} comment={comment} />;
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps, { addComment, openModal })(Comments);
