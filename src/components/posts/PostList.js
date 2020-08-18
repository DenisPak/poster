import React from "react";
import { connect } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PostSummary from "./PostSummary";

const PostList = ({ posts, category }) => {
  useFirestoreConnect([
    { collection: "posts", orderBy: ["createdAt", "desc"] },
  ]);

  if (category && posts) {
    posts = posts.filter((post) => post.category.optionName === category);
  }
  return (
    <>
      {posts
        ? category && !posts.length
          ? "There are no posts in this category :(. Consider adding one yourself"
          : posts.map((post) => {
              return <PostSummary post={post} key={post.id} />;
            })
        : null}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    posts: state.firestore.ordered.posts,
  };
};
export default connect(mapStateToProps)(PostList);
