import React, { useState } from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useFirestoreConnect } from "react-redux-firebase";

import Bookmarks from "./Bookmarks";
import ProfileComments from "./ProfileComments";
const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#1890ff",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),

    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#40a9ff",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  profilePaper: {
    padding: "10px",
  },
}));

const Profile = (props) => {
  useFirestoreConnect([
    { collection: "posts", orderBy: ["createdAt", "desc"] },
  ]);
  useFirestoreConnect([{ collection: "users" }]);
  const [tab, setTab] = useState(0);
  const classes = useStyles();

  const uid = props.match.params.id;
  // const user = props.users.find((user) => user.id === uid);
  // console.log(user);

  return (
    <Container maxWidth="md">
      <Box
        display="grid"
        gridTemplateColumns="1"
        gridGap="15px"
        paddingTop="80px"
        textAlign="left"
      >
        <Paper elevation={0}>
          <Box padding="10px">
            <AccountBoxIcon style={{ fontSize: "50px" }} />
            <Typography component="h4" variant="h4">
              Pak Denis
            </Typography>
          </Box>
          <div>
            <AntTabs
              value={tab}
              indicatorColor="primary"
              textColor="primary"
              onChange={(e, newValue) => setTab(newValue)}
              aria-label="disabled tabs example"
            >
              <AntTab label="Bookmarks" />
              <AntTab label="Comments" />
            </AntTabs>
          </div>
        </Paper>
        {props.posts && props.users && props.auth ? (
          tab == 0 ? (
            <Bookmarks
              posts={props.posts}
              users={props.users}
              auth={props.auth}
              uid={uid}
            />
          ) : (
            <ProfileComments
              posts={props.posts}
              users={props.users}
              auth={props.auth}
              uid={uid}
            />
          )
        ) : null}
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.firestore.ordered.posts,
    users: state.firestore.ordered.users,
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Profile);
