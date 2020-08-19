import React from "react";
import Box from "@material-ui/core/Box";

import PostSummary from "./PostSummary";

const CreatedPosts = ({ users, posts, auth, uid }) => {
  const createdPosts = posts
    .filter((post) => post.authorId === uid)
    .map((post) => <PostSummary post={post} key={post.id} />);
  return (
    <Box
      display="grid"
      gridTemplateColumns="1"
      gridGap="15px"
      textAlign="left"
      marginBottom="15px"
    >
      {createdPosts}
    </Box>
  );
};

export default CreatedPosts;
