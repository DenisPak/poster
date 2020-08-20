import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { createPost } from "../../actions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import moment from "moment";
import { Redirect } from "react-router-dom";
//VERY MESSY, SEPARATE INTO SEVERAL COMPONENTS

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    textAlign: "left",
    maxWidth: "1020px",
    width: "100%",
    minHeight: "100%",
    [theme.breakpoints.down("md")]: {
      borderRadius: 0,
    },
    paddingTop: "64px",
  },
  container: {
    display: "flex",
    minHeight: "100%",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },

  createPostNav: {
    position: "fixed",
    height: "64px",
    maxWidth: "1020px",
    width: "100%",
    padding: "0 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "2px solid #f4f4f4",
    zIndex: "19",
    backgroundColor: "#fff",
  },
  content: {
    maxWidth: "750px",
    width: "100%",

    textAlign: "right",
    [theme.breakpoints.down("md")]: {
      maxWidth: "700px",
    },
  },
  navContent: {
    maxWidth: "750px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      maxWidth: "700px",
    },
  },
  createForm: {
    marginTop: "64px",
    paddingTop: "10px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  image: {
    display: "inline-block",
    width: "100%",
    marginBottom: "20px",
  },
  autoComplete: {
    maxWidth: "500px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  meta: {
    fontSize: "14px",
  },
  date: {
    marginLeft: "15px",
    cursor: "default",
  },
  adornment: {
    position: "absolute",
    left: "0px",
  },
}));

const CreatePost = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [header, setHeader] = useState("");
  const [headerImg, setHeaderImg] = useState("");
  const [category, setCategory] = useState({
    optionName: "",
    optionImg: "",
  });

  const classes = useStyles();
  const options = [
    {
      optionName: "HTML",
      optionImg: "https://img.icons8.com/color/15/000000/html-5.png",
    },
    {
      optionName: "CSS",
      optionImg: "https://img.icons8.com/color/15/000000/css3.png",
    },
    {
      optionName: "JS",
      optionImg: "https://img.icons8.com/color/15/000000/javascript.png",
    },
    {
      optionName: "React",
      optionImg: "https://img.icons8.com/office/16/000000/react.png",
    },
  ];
  if (!props.auth.uid) return <Redirect to="/" />;
  const createPost = () => {
    props.createPost({ title, content, header, headerImg, category });
    props.history.push("/");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
  };
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Paper elevation={0} className={classes.paper}>
        <nav className={classes.createPostNav}>
          <div className={classes.navContent}>
            <div className={classes.autoComplete}>
              <Autocomplete
                disableClearable
                options={options}
                getOptionLabel={(option) => option.optionName}
                value={category}
                onChange={(event, newValue) => {
                  setCategory(newValue);
                }}
                renderOption={(option) => {
                  return (
                    <>
                      <img
                        className={classes.adornment}
                        src={option.optionImg}
                        alt={option.optionName}
                      />
                      {option.optionName}
                    </>
                  );
                }}
                style={{ minWidth: "125px", marginRight: "20px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment>
                          <img src={category.optionImg} alt="" />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Category"
                  />
                )}
              />
              <Typography className={classes.meta} component="p">
                {props.auth.displayName
                  ? props.auth.displayName
                  : `${props.profile.firstName} ${props.profile.lastName}`}
                <span className={classes.date}>
                  {`${moment().format("MMMM Do")} at ${moment().format(
                    "h:mm"
                  )}`}
                </span>
              </Typography>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
              onClick={createPost}
            >
              Create
            </Button>
          </div>
        </nav>
        <form
          className={classes.createForm}
          onSubmit={(e) => handleSubmit(e)}
          autoComplete="off"
        >
          <div className={classes.content}>
            <TextField
              placeholder="Title"
              required
              value={title}
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
              multiline
              inputProps={{ maxLength: 120 }}
              InputProps={{
                disableUnderline: true,
                style: {
                  fontSize: 30,
                  fontWeight: 700,
                },
              }}
            />
            <TextField
              multiline
              fullWidth
              placeholder="Input header paragraph (optional)"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              inputProps={{ maxLength: 180 }}
              InputProps={{
                disableUnderline: true,
                style: {
                  fontSize: 18,
                },
              }}
            />
            <TextField
              multiline
              fullWidth
              placeholder="Input link to header image (optional)"
              value={headerImg}
              onChange={(e) => setHeaderImg(e.target.value)}
              InputProps={{
                disableUnderline: true,
                style: {
                  fontSize: 18,
                },
              }}
            />
            <TextField
              multiline
              fullWidth
              placeholder="Write your post"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              InputProps={{
                disableUnderline: true,
                style: {
                  fontSize: 18,
                  marginTop: "20px",
                },
              }}
            />
          </div>
        </form>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps, { createPost })(CreatePost);
