import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Container, Paper, paperClasses } from "@mui/material";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "../axios/axios";
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function ForgotPasswordPage() {
  const [openFail, setOpenFail] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  // const [toast, setToast] = React.useState("");
  const fetchNewPassWord = (email) => {
    console.log(email);
    axios
      .post("/randomPassword", {
        email: email,
      })
      .then((res) => {
        console.log(res);
        setOpenSuccess(true);
      })
      .catch((e) => {
        console.log("failed");
        console.log(e.response.status);
        setOpenFail(true);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    fetchNewPassWord(data.get("email"));
    // console.log({
    //   email: data.get('email')
    // });
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
    <Container maxWidth={"md"}>
      <Paper elevation={0} style={{ height: "100vh" }}>
        {/* <p> MyDiary </p> {""}{" "} */}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Send new password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
            <Grid item xs>
              <Link sx={{ fontSize: "1rem", color: "#818ea3" }} href="/login" variant="body2">
                Login in! gogogog!
              </Link>
            </Grid>
          </Box>
        </Box>
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
            error email!!
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
            new password sent to your email.
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}
