import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

export const modalReducr = (state = false, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return action.payload;
    case "CLOSE_MODAL":
      return action.payload;
    default:
      return state;
  }
};

export const authReducer = (state = { authError: null }, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: null,
      };
    case "SIGNOUT_SUCCESS":
      return state;
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        authError: null,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: "Login failed",
      };
    case "SIGNOUT_ERROR":
      return state;
    case "SIGNUP_ERROR":
      return state;
    default:
      return state;
  }
};

export const postsReducer = (state = [], action) => {
  switch (action.type) {
    case "POST_ADDED":
      console.log(action.post);
      return state;
    case "CREATE_POST_ERROR":
      console.log(action.err);
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer,
  posts: postsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  modalOpen: modalReducr,
});
