import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Paper } from "@mui/material";
import axios from "../axios/axios";
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";
import CookieParser from "../CookieParser/CookieParser";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
const ResetPasswordPage = () => {
  const [redirect, setRedirect] = React.useState(false);
  const cookieParser = new CookieParser(document.cookie);
  useEffect(() => {
    if (
      cookieParser.getCookieByName("token") === "undefined" ||
      cookieParser.getCookieByName("token") === null
    ) {
      console.log("fail");
      setRedirect(true);
    } else {
      if (
        cookieParser.getCookieByName("email") === "undefined" ||
        cookieParser.getCookieByName("email") === null
      ) {
        console.log("fail");
        setRedirect(true);
      } else {
        console.log("success");
      }
    }
  }, []);
  const [openFail, setOpenFail] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  let email = "";
  let password = "";
  let newPassword = "";
  const handleEmailChange = (event) => {
    email = event.target.value;
    console.log(email);
  };
  const handlePasswordChange = (event) => {
    password = event.target.value;
    console.log(password);
  };
  const handleNewPasswordChange = (event) => {
    newPassword = event.target.value;
    console.log(newPassword);
  };
  const resetPassword = (event) => {
    console.log("email " + email);
    console.log("password " + password);
    axios
      .post(
        "/resetPassword",
        {
          email: email,
          password: password,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: cookieParser.getCookieByName("token"),
          },
        }
      )
      .then((response) => {
        document.cookie = "token=" + response.data.token;
        console.log(response);
        setOpenSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setOpenFail(true);
      });
  };
  const handleCloseFail = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFail(false);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };
  return (
    <Container maxWidth={"sm"}>
      <Paper elevation={0} style={{ height: "100vh" }}>
        {redirect ? <Navigate to={"/login"} /> : ""}
        {/* <p> MyDiary </p> {""} */}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          {/* <Box component="form" noValidate  sx={{ mt: 3 }}> */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Old Password"
                type="password"
                id="password"
                autoComplete="old_password"
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="newPassword"
                label="New password"
                type="password"
                id="newPassword"
                autoComplete="new_password"
                onChange={handleNewPasswordChange}
              />
            </Grid>
          </Grid>
          <Button
            //href="/"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={resetPassword}
          >
            Reset Password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                sx={{ fontSize: "1rem", color: "#818ea3" }}
                href="/forgotpassword"
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
        {/* </Box> */}
        <Snackbar
          open={openFail}
          autoHideDuration={2000}
          onClose={handleCloseFail}
        >
          <Alert
            onClose={handleCloseFail}
            severity="error"
            sx={{ width: "100%" }}
          >
            verify failed!!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openSuccess}
          autoHideDuration={2000}
          onClose={handleCloseSuccess}
        >
          <Alert
            onClose={handleCloseSuccess}
            severity="success"
            sx={{ width: "100%" }}
          >
            verify successfully.
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};
export default ResetPasswordPage;
