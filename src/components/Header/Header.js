import React, { useState } from "react";
import MDlogo from "./MDlogo";
import ModeSwitch from "./ModeSwitch";
import SearchForm from "./SearchForm";
import "./Header.css";
import AccountCircleSharp from "@material-ui/icons/AccountCircleSharp";
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Grid,
  IconButton,
} from "@material-ui/core";
import SmallHeader from "./SmallHeader";
import LogInOrOutButton from "./LogInOrOutButton";
import { useEffect } from "react";
import CookieParser from "../CookieParser/CookieParser";
import { Button } from "@mui/material";
import { Outlet } from "react-router-dom";

// to make some scorll effect
function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 10 : 0,
  });
}

const Header = (props) => {
  let cookieParser = new CookieParser(document.cookie);
  const [email, setEmail] = useState(cookieParser.getCookieByName("email"));
  const [isLogin, setLogin] = useState(false);
  // to recive the param from child
  const changeDarkMode = (enteredDarkMode) => {
    const darkMode = enteredDarkMode;
    props.onChangeDarkMode(enteredDarkMode);
    console.log("In Header is " + darkMode);
  }
  useEffect(() => {
    console.log("in header");
    console.log(cookieParser.getCookieByName('token'));

    if ((cookieParser.getCookieByName('token') === "undefined") || (cookieParser.getCookieByName('token') === null)) {
      console.log("faila");
    }
    else {
      if (cookieParser.getCookieByName('email') === "undefined" || (cookieParser.getCookieByName('token') === null)) {
        console.log("failb");

      } else {
        console.log("success");
        setLogin(true);
        setEmail(cookieParser.getCookieByName('email'));
      }
    }
  })
  //, [isLogin,email]
  const showSearchResult = (enteredKeyWord) => {
    props.onShowSearchResult(enteredKeyWord);
  }

  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar sx={{
          bgcolor: (theme) => theme.palette.primary.main,
        }} color="primary" position="sticky">
          <Toolbar>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Grid sx={{textAlign:"left"}} item xs={2} sm={2} md={2}>
                <MDlogo></MDlogo>
              </Grid>
              <Grid sx={{textAlign:"right"}} item xs={2} sm={2} md={3}>
                <SearchForm onShowSearchResult={showSearchResult} ></SearchForm>
                {/* <SearchForm ></SearchForm> */}
              </Grid>
              <Grid sx={{textAlign:"right"}} item xs={2} sm={2} md={4}><SmallHeader /></Grid>

              <Grid sx={{ textAlign:"right"}} item xs={6} sm={6} md={3}>
                {email === "allen3325940072@gmail.com"
                  ? <IconButton
                    onClick={() => {
                      console.log("Profile");
                    }}
                    sx={{ margin: "10px" }}
                    href={"/user"}
                  >
                    <AccountCircleSharp fontSize="large"></AccountCircleSharp>
                  </IconButton>
                  : ""}
                <LogInOrOutButton />
                <ModeSwitch
                  onChangeDarkMode={changeDarkMode}
                  sx={{ m: 4 }}
                ></ModeSwitch>

                {/* <Button
                      variant="contained"
                      href="/calenderSearch"
                      size="small">Calender</Button> */}

              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Outlet />
    </React.Fragment>
    
  );
};

export default Header;
