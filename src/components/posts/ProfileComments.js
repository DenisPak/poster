import React from "react";
import Box from "@material-ui/core/Box";

import PostSummary from "./PostSummary";

const Bookmarks = ({ users, posts, auth, uid }) => {
  const comments = users
    .find((user) => {
      return user.id === uid;
    })
    .comments.map((comment) => {
      return (
        <PostSummary
          post={posts.find((post) => post.id === comment.postId)}
          comment={comment}
          key={comment.commentId}
        />
      );
    });

  return (
    <Box
      display="grid"
      gridTemplateColumns="1"
      gridGap="15px"
      textAlign="left"
      marginBottom="15px"
    >
      {comments}
    </Box>
  );
};

export default Bookmarks;
