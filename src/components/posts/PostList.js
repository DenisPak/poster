import React from "react";
import { connect } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PostSummary from "./PostSummary";

const PostList = (props) => {
  useFirestoreConnect([
    { collection: "posts", orderBy: ["createdAt", "desc"] },
  ]);
  console.log("");
  return (
    <>
      {props.posts
        ? props.posts.map((post) => {
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
