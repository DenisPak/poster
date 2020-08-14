import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import Notifications from "./Notifications";
import PostList from "./PostList";
const Dashboard = () => {
  return (
    <div>
      <Container maxWidth="md">
        <Box
          display="grid"
          gridTemplateColumns="1"
          gridGap="15px"
          paddingTop="80px"
          textAlign="left"
        >
          {/* <Paper elevation={0}>
            <Notifications />
          </Paper> */}
          <PostList />
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard;
