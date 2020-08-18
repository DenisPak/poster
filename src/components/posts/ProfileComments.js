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
  console.log(comments);
  // const profileComments = posts
  //   .filter((post) => comments.some((comment) => comment.postId === post.id))
  //   .map((post) => <PostSummary post={post} key={comment.id} />);
  // console.log(profileComments);
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
