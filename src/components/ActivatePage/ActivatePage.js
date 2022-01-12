import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Container, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "../axios/axios";
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";
import CookieParser from "../CookieParser/CookieParser";
import { Navigate } from "react-router-dom";

export default function ActivatePage() {
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [resendSuccess, setResendSuccess] = React.useState(false);
  const [openFail, setOpenFail] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  let code = "";
  const cookieParser = new CookieParser(document.cookie);
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   // eslint-disable-next-line no-console
  //   console.log({
  //     activate_code: data.get('activate_code'),
  //   });
  // };
  const handleCodeChange = (event) => {
    code = event.target.value;
    console.log(code);
  };
  const axverify = () => {
    if (
      (cookieParser.getCookieByName("token") === "undefined") |
      (cookieParser.getCookieByName("token") === null)
    ) {
      console.log("fail");
    } else {
      if (
        (cookieParser.getCookieByName("email") === "undefined") |
        (cookieParser.getCookieByName("email") === null)
      ) {
        console.log("fail");
      } else {
        console.log("success");
      }
    }
    console.log(code);
    axios
      .post("/verify", {
        email: cookieParser.getCookieByName("email"),
        code: code,
      })
      .then((res) => {
        console.log(res);
        setOpenSuccess(true);
        setRedirect(true);
      })
      .catch((error) => {
        console.log(error);
        setOpenFail(true);
      });
  };
  const resend = () => {
    axios
      .post(
        "/resendCode",
        { email: cookieParser.getCookieByName("email") },
        {
          headers: {
            Authorization: cookieParser.getCookieByName("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        setResendSuccess(true);
      })
      .catch((error) => console.log(error.response.status));
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

  const handleCloseResend = (event, reason) => {
    if (reason === "clickway") {
      return;
    }
    setResendSuccess(false);
  };
  return (
    <Container maxWidth={"sm"}>
      <Paper elevation={0} style={{ height: "100vh" }}>
        {redirect ? <Navigate to={"/login"} /> : ""}
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
            Verification
          </Typography>
          {/* <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}> */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="activate_code"
                label="activate_codes"
                name="activate_code"
                autoComplete="activate_code"
                onChange={handleCodeChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={axverify}
          >
            Verify
          </Button>
          <Typography component="h1" variant="h5">
            Didn't receive the verification email?
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={resend}
          >
            resend
          </Button>
          <Grid container justifyContent="flex-end"></Grid>
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
            error code!!
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
            successful verify!
          </Alert>
        </Snackbar>
        <Snackbar
          open={resendSuccess}
          autoHideDuration={2000}
          onClose={handleCloseResend}
        >
          <Alert
            onClose={handleCloseSuccess}
            severity="success"
            sx={{ width: "100%" }}
          >
            Already resend activate code!
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}
