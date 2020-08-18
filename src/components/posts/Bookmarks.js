import React from "react";
import Box from "@material-ui/core/Box";

import PostSummary from "./PostSummary";

const Bookmarks = ({ users, posts, auth, uid }) => {
  const bookmarkIds = users.find((user) => {
    return user.id === uid;
  }).bookmarks;
  const bookmarks = posts
    .filter((post) => bookmarkIds.some((bookmarkId) => bookmarkId === post.id))
    .map((bookmark) => <PostSummary post={bookmark} key={bookmark.id} />);
  console.log(bookmarks);
  return (
    <Box
      display="grid"
      gridTemplateColumns="1"
      gridGap="15px"
      textAlign="left"
      marginBottom="15px"
    >
      {bookmarks}
    </Box>
  );
};

export default Bookmarks;
