import { firestore } from "firebase";

export const openModal = () => {
  return {
    type: "OPEN_MODAL",
    payload: true,
  };
};

export const closeModal = () => {
  return {
    type: "CLOSE_MODAL",
    payload: false,
  };
};
export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => dispatch({ type: "LOGIN_SUCCESS" }))
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      })
      .catch((err) => {
        dispatch({
          type: "SIGNOUT_ERROR",
          err,
        });
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((res) => {
        return firestore.set(
          { collection: "users", doc: res.user.uid },
          {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0],
            bookmarks: [],
            comments: [],
          }
        );
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const signInWithProvider = (user) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    console.log(user);
    firestore
      .get({ collection: "users", doc: user.user.uid })
      .then((user) => {
        return firestore.set(
          { collection: "users", doc: user.user.uid },
          {
            firstName: user.additionalUserInfo.profile.given_name,
            lastName: user.additionalUserInfo.profile.family_name,
            initials:
              user.additionalUserInfo.profile.given_name[0] +
              user.additionalUserInfo.profile.family_name[0],
            bookmarks: [],
            comments: [],
          }
        );
      })
      .then(() => dispatch({ type: "LOGIN_SUCCESS" }))
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const createPost = (post) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .add("posts", {
        ...post,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
        comments: [],
      })
      .then(() => {
        dispatch({
          type: "POST_ADDED",
          post: post,
        });
      })
      .catch((err) => {
        dispatch({
          type: "CREATE_POST_ERROR",
          err,
        });
      });
  };
};

export const addComment = (post, comment) => {
  return (dispatch, getState, { getFirestore }) => {
    const profile = getState().firebase.profile;
    const firestore = getFirestore();
    firestore
      .update(
        { collection: "posts", doc: post.id },
        { comments: [comment, ...post.comments] }
      )
      .then(() => {
        return firestore.update(
          { collection: "users", doc: comment.uid },
          { comments: [comment, ...profile.comments] }
        );
      })
      .then(() => {
        dispatch({
          type: "COMMENT_ADDED",
          comment,
        });
      })
      .catch((err) => {
        dispatch({
          type: "COMMENT_ADD_ERROR",
          err,
        });
      });
  };
};

export const changeBookmark = (bookmarked, bookmarkId) => {
  return (dispatch, getState, { getFirestore }) => {
    const profile = getState().firebase.profile;
    const uid = getState().firebase.auth.uid;
    const firestore = getFirestore();
    if (bookmarked) {
      firestore
        .update(
          { collection: "users", doc: uid },
          { bookmarks: [...profile.bookmarks, bookmarkId] }
        )
        .then(() => {
          dispatch({
            type: "BOOKMARK_ADDED",
            bookmarkId,
          });
        })
        .catch((err) => {
          dispatch({
            type: "BOOKMARK_ADDED_ERROR",
            err,
          });
        });
    } else {
      firestore
        .update(
          { collection: "users", doc: uid },
          {
            bookmarks: [
              ...profile.bookmarks.filter((bookmark) => bookmark != bookmarkId),
            ],
          }
        )
        .then(() => {
          dispatch({
            type: "BOOKMARK_ADDED",
            bookmarkId,
          });
        })
        .catch((err) => {
          dispatch({
            type: "BOOKMARK_ADDED_ERROR",
            err,
          });
        });
    }
  };
};
// {
//   bookmarks: [...profile.bookmarks, post.id];
// }
