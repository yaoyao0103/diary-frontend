import * as React from "react";
import "./RegisterPage.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import axios from "../axios/axios";
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";
import { Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import CookieParser from "../CookieParser/CookieParser";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const [openFail, setOpenFail] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [isVerified, setIsVerified] = React.useState(false);

  let email = "";
  let password = "";
  let checkpassword = "";
  let cookieParser = new CookieParser(document.cookie);
  function onChange(value) {
    setIsVerified(true);
  }
  const handleEmailChange = (event) => {
    email = event.target.value;
  };
  const handlePasswordChange = (event) => {
    password = event.target.value;
  };
  const handleCheckpasswordChange = (event) => {
    checkpassword = event.target.value;
  };
  const signup = (event) => {
    let temp_email = email ? email : document.getElementById("email").value;
    let temp_password = password ? password : document.getElementById("password").value;
    let temp_checkpassword = checkpassword ? checkpassword : document.getElementById("checkpassword").value;
    if (temp_password != temp_checkpassword) {
      setOpenFail(true);
      return;
    }
    
    if(!isVerified){
      Swal.fire('Please verify that you are a human', '', 'error');
      return;
    }
    axios
      .post("/signUp", {
        email: temp_email,
        password: temp_password,
      })
      .then((response) => {
        document.cookie = "email=" + email;
        
      })
      .then(() => {
        if (isVerified) {
          setRedirect(true);
          setOpenSuccess(true);
        } 
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
        {redirect ? <Navigate to={"/activate"} /> : ""}
        {/* <p> MyDiary </p> */}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
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
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="checkpassword"
                label="Enter Password Again"
                type="password"
                id="checkpassword"
                autoComplete="checkpassword"
                onChange={handleCheckpasswordChange}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <ReCAPTCHA
            sitekey="6LcuzQ0eAAAAAP9YxF_6OMJCd6zsr48z7GHCyrjR"
            onChange={onChange}
          />
          <Button
            // href="/activate"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={signup}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
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
            Invaild register!!
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
            register successfully.
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};
export default RegisterPage;
