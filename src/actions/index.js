import { firestore } from "firebase";

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

export const setCategory = (category) => {
  return {
    type: "CATEGORY_CHANGED",
    payload: category,
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
          }
        );
      })
      .then()
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
    firestore
      .set(
        { collection: "users", doc: user.user.uid },
        {
          firstName: user.additionalUserInfo.profile.given_name,
          lastName: user.additionalUserInfo.profile.family_name,
          initials:
            user.additionalUserInfo.profile.given_name[0] +
            user.additionalUserInfo.profile.family_name[0],
        }
      )
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
