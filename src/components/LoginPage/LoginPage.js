import "./LoginPage.css";
import React from "react";
import { Button, Container, Paper } from "@mui/material";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from "../axios/axios";
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';
import CookieParser from "../CookieParser/CookieParser";
import { Navigate } from "react-router-dom";
import Header from "../Header/Header";
import LogInOrOutButton from "../Header/LogInOrOutButton";

function LoginPage() {
  const [openFail, setOpenFail] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [redirectActivate, setRedirectActivate] = React.useState(false);
  const [render, setRender] = React.useState(false);
  // let email = "";
  const [email, setEmail] = React.useState("");
  // let password = "";
  const [password, setPassword] = React.useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    console.log(email);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  }

  const login = () => {

    axios.post("/login", {
      email: email,
      password: password
    })
      .then(res => {
        document.cookie = "token=" + res.data.token;
        //console.log(document.cookie);
        let cookieParser_token = new CookieParser(document.cookie);
        document.cookie = "email=" + res.data.email;
        //console.log(document.cookie);
        let cookieParser_email = new CookieParser(document.cookie);
        console.log(cookieParser_email.getCookieByName('email'));
        // console.log(document.cookie);
        // console.log("success");
        // console.log(res);
        <LogInOrOutButton />
        console.log("parse");
        // console.log(cookieParser.getCookieByName('token'));
        setOpenSuccess(true);
      })
      .then(() => {
        setRedirect(true);
      })
      .catch((error) => {
        console.log(error.response.status)
        if(error.response.status === 403){
          setRedirectActivate(true);
        }
        setOpenFail(true);
      })
  }
  const handleCloseFail = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFail(false);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log("data is "+data.toString())
  //   // eslint-disable-next-line no-console
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //     remeber: data.get('password'),
  //   });
  // };

  return (
    <Container maxWidth={"sm"}>
      <Paper elevation={0} style={{ height: "100vh" }} className="login_page">
        {redirectActivate ? <Navigate to={"/activate"} /> : ""}
        {redirect ? <Navigate to={"/"} /> : ""}
        {/* <p> MyDiary </p> */}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmailChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // href="/"
            onClick={login}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link sx={{ fontSize: "1rem", color: "#818ea3" }} href="/forgotpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link sx={{ fontSize: "1rem", color: "#818ea3" }} href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          {/* </Box> */}
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        <Snackbar open={openFail} autoHideDuration={2000} onClose={handleCloseFail}>
          <Alert onClose={handleCloseFail} severity="error" sx={{ width: '100%' }}>
            error login informantion!!
          </Alert>
        </Snackbar>
        <Snackbar open={openSuccess} autoHideDuration={2000} onClose={handleCloseSuccess}>
          <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
            login successfully.
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}

export default LoginPage;
