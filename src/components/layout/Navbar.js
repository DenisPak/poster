import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import reactImg from "../../images/react-30.png";
import htmlImg from "../../images/html-30.png";
import cssImg from "../../images/css-30.png";
import jsImg from "../../images/js-30.png";
import firebaseImg from "../../images/firebase-30.png";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  brandLogo: {
    textDecoration: "none",
    color: "white",
  },
  appBar: {},
  drawer: {
    width: 240,
    flexShrink: 0,
    zIndex: 5,
  },
  drawerPaper: {
    width: 240,
    zIndex: 5,
    paddingTop: "64px",
  },
  presentation: {
    zIndex: 5,
  },
}));

const Navbar = ({ auth }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const options = [
    {
      optionName: "HTML",
      optionImg: htmlImg,
    },
    {
      optionName: "CSS",
      optionImg: cssImg,
    },
    {
      optionName: "JS",
      optionImg: jsImg,
    },
    {
      optionName: "React",
      optionImg: reactImg,
    },
    {
      optionName: "Firebase",
      optionImg: firebaseImg,
    },
  ];
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        {isLoaded(auth) ? (
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => setOpen(!open)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              <Link to="/" className={classes.brandLogo}>
                Poster
              </Link>
            </Typography>
            {auth.uid ? <SignedInLinks /> : <SignedOutLinks />}
          </Toolbar>
        ) : null}
      </AppBar>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          <ListItem button disabled>
            <ListItemText primary="Will be enabled after rating system is implemented" />
          </ListItem>
          {["Top", "Hot", "New"].map((text, index) => (
            <ListItem button key={text} disabled>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["HTML", "CSS", "JS", "React", "Firebase"].map((text) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <img
                  src={
                    options.find((option) => option.optionName === text)
                      .optionImg
                  }
                />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Navbar);
