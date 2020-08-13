import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { signUp } from "../../actions";
const useStyles = makeStyles((theme) => ({
  inBtn: {
    marginTop: "20px",
    marginLeft: "20px",
  },
  right: {
    textAlign: "right",
  },
  pointer: {
    cursor: "pointer",
  },
}));
const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signUp({
      email,
      password,
      firstName,
      lastName,
    });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
        <Typography component="h6" variant="h6">
          Sign Up with Email
        </Typography>

        <TextField
          id="standard-basic"
          label="Enter Email"
          required
          fullWidth
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          id="standard-basic"
          label="Enter Password"
          type="password"
          required
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <TextField
          id="standard-basic"
          label="Enter First Name"
          fullWidth
          required
          onChange={(e) => setFirst(e.target.value)}
          value={firstName}
        />
        <TextField
          id="standard-basic"
          label="Enter Last Name"
          fullWidth
          required
          onChange={(e) => setLast(e.target.value)}
          value={lastName}
        />
        <div className={classes.right}>
          <Button
            className={classes.inBtn}
            type="submit"
            disableElevation
            onClick={props.handleBack}
          >
            Cancel
          </Button>
          <Button
            className={classes.inBtn}
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default connect(null, { signUp })(SignUp);
