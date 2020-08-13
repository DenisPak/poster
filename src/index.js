import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
  getFirebase,
} from "react-redux-firebase";
import {
  createFirestoreInstance,
  firestoreReducer,
  reduxFirestore,
  getFirestore,
} from "redux-firestore";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import reducers from "./reducers";
import "./index.css";
import App from "./App";
import firebase, { firebaseConfig } from "./firebase";

// const createStoreWithFirebase = compose(
//   reduxFirestore(firebase) // firebase instance as first argument, rfConfig as optional second
// )(createStore);
const theme = createMuiTheme({
  typography: {
    h5: {
      fontWeight: 700,
    },
  },
});

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase)
  )
);

const fbProps = {
  firebase,
  config: { useFirestoreForProfile: true, userProfile: "users" },
  firebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...fbProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
