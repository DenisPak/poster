import React, { useState } from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import { useFirestoreConnect } from "react-redux-firebase";

import CreatedPosts from "./CreatedPosts";
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

const Profile = ({ posts = null, users = null, auth = null, match }) => {
  useFirestoreConnect([
    { collection: "posts", orderBy: ["createdAt", "desc"] },
  ]);
  useFirestoreConnect([{ collection: "users" }]);
  const [tab, setTab] = useState(0);

  if (!posts || !users || !auth) return <div />;

  const uid = match.params.id;
  const user = users.find((user) => user.id === uid);

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
            {user ? (
              <>
                <AccountBoxIcon style={{ fontSize: "50px" }} />
                <Typography component="h4" variant="h4">
                  {`${user.firstName} ${user.lastName}`}
                </Typography>
              </>
            ) : (
              <Typography component="p">User does not exist</Typography>
            )}
          </Box>
          {user ? (
            <div>
              <AntTabs
                value={tab}
                indicatorColor="primary"
                textColor="primary"
                onChange={(e, newValue) => setTab(newValue)}
                aria-label="disabled tabs example"
              >
                <AntTab label="Created Posts" />
                <AntTab label="Bookmarks" />
                <AntTab label="Comments" />
              </AntTabs>
            </div>
          ) : null}
        </Paper>
        {user ? (
          tab === 0 ? (
            <CreatedPosts posts={posts} users={users} auth={auth} uid={uid} />
          ) : tab === 1 ? (
            <Bookmarks posts={posts} users={users} auth={auth} uid={uid} />
          ) : (
            <ProfileComments
              posts={posts}
              users={users}
              auth={auth}
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
