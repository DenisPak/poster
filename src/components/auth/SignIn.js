import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { signIn } from "../../actions";

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

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signIn({ email, password });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Typography component="h6" variant="h6">
          Sign in with Email
        </Typography>
        <Typography>
          or{" "}
          <Link className={classes.pointer} onClick={props.signUp}>
            sign up{" "}
          </Link>
        </Typography>

        <TextField
          id="standard-basic"
          label="Enter Email"
          fullWidth
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          id="standard-basic"
          label="Enter Password"
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default connect(null, { signIn })(SignIn);
