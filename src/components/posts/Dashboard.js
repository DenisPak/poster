import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import PostList from "./PostList";
const Dashboard = (props) => {
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
          <PostList
            category={props.match.params ? props.match.params.category : ""}
            key={props.match.params ? props.match.params.category : ""}
          />
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard;
