import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MailIcon from "@material-ui/icons/Mail";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";

import firebase from "../../firebase";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import { signInWithProvider, signIn } from "../../actions";

const useStyles = makeStyles((theme) => ({
  modalPaper: {
    maxWidth: "500px",
    width: "100%",
    maxHeight: "500px",
    height: "100%",
    margin: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 30px",
    "&:focus": {
      outline: "none",
    },
  },
  emailButton: {
    textTransform: "none",
    border: "none",
    width: "100%",
    maxWidth: "200px",
    padding: "5px 16px",
    borderRadius: "2px",
    textAlign: "left",
    backgroundColor: "#db4437",
    color: "#fff",

    boxShadow:
      "0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);",
    "&:hover": {
      backgroundColor: "#db4437",
    },
  },
  marginBtn: {
    marginLeft: "14px",
  },
  label: {
    justifyContent: "flex-start",
  },
}));

const SignedOutLinks = (props) => {
  const [open, setOpen] = useState(false);
  const [inForm, setInForm] = useState(false);
  const [upForm, setUpForm] = useState(false);
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setInForm(false);
    setUpForm(false);
    setOpen(false);
  };

  const handleBack = () => {
    setInForm(false);
    setUpForm(false);
  };

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: (profile) =>
        props.signInWithProvider(profile),
    },
  };
  console.log();
  const SignInModal = (
    <>
      <Typography component="h6" variant="h6">
        Sign In
      </Typography>

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <Button
        variant="outlined"
        classes={{ label: classes.label }}
        className={classes.emailButton}
        onClick={() => setInForm(!inForm)}
      >
        <MailIcon fontSize="small" />
        <span className={classes.marginBtn}>Sign in with email</span>
      </Button>
    </>
  );
  return (
    <div>
      <Button color="inherit" onClick={handleOpen}>
        Signin
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper className={classes.modalPaper}>
          {inForm ? (
            upForm ? (
              <SignUp handleBack={handleBack} />
            ) : (
              <SignIn signUp={setUpForm} handleBack={handleBack} />
            )
          ) : (
            SignInModal
          )}
        </Paper>
      </Modal>
    </div>
  );
};

export default connect(null, { signInWithProvider })(SignedOutLinks);
