import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/posts/Dashboard";
import Post from "./components/posts/Post";

import CreatePost from "./components/posts/CreatePost";
import { makeStyles } from "@material-ui/core/styles";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/category/:category" component={Dashboard} />
          <Route path="/post/:id" component={Post} />
          <Route path="/create" component={CreatePost} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
