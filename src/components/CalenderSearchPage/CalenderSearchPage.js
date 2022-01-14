import * as React from "react";
import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import { Grid } from "@material-ui/core";
import axios from "../axios/axios";
import "./CalenderSearchPage.css";
import { Paper,Alert,Snackbar } from "@mui/material";
import Card from "../Cards/Card";
import CookieParser from "../CookieParser/CookieParser";
import { Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Cards from "../Cards/Cards";

const CalenderSearchPage = () => {
  const [isLogin, setIsLogin] = React.useState(false);
  const [value, setValue] = React.useState(new Date());
  const [diarys, setDiarys] = React.useState([]);
  const [fetchDiaryAlready, setFetchDiaryAlready] = React.useState(true);
  const [redirect, setRedirect] = React.useState(false);
  const [redirectArticle, setRedirectArticle] = React.useState(false);
  const [enterLink, setEnterLink] = React.useState(false);
  const [reRender, setReRender] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFail, setOpenFail] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState("");

  let tmp = [];
  const cookieParser = new CookieParser(document.cookie);
  useEffect(() => {
    setReRender(false);
    if (
      cookieParser.getCookieByName("token") == "undefined" ||
      cookieParser.getCookieByName("token") == null ||
      cookieParser.getCookieByName("email") == "undefined" ||
      cookieParser.getCookieByName("email") == null
    ) {
      console.log("fail");
      setIsLogin(false);
      setRedirect(true);
    } else {
      setIsLogin(true);
      console.log("success");
      // if (isLogin) {
      setFetchDiaryAlready(false);
      console.log("ready to featch.");
      fetchDiary();
      // }
    }
  }, [value,reRender]);

  const passArticleLink = (enteredLink) => {
    setEnterLink(enteredLink);
    setRedirectArticle(true);
  };
  const passReRender = (enteredBool) => {
    setReRender(enteredBool);
  }
  // useEffect(() => {
  //     if (isLogin) {
  //         setFetchDiaryAlready(false);
  //         console.log("ready to featch.");
  //         fetchDiary();
  //     }
  // }, [value]);

  const alertSuc = (msg) => {
      setToastMsg(msg);
      setOpenSuccess(true);
  }

  const alertFail = (msg) => {
      setToastMsg(msg);
      setOpenFail(true);
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


  const fetchDiary = () => {
    console.log("featch diary.");
    let day = "";
    let month = "";
    if (value.getDate() < 10) {
      day = "0" + value.getDate().toString();
    } else {
      day = value.getDate().toString();
    }
    if (value.getMonth() + 1 < 10) {
      month = "0" + (value.getMonth() + 1).toString();
    } else {
      month = (value.getMonth() + 1).toString();
    }
    let date = value.getFullYear().toString() + month + day;
    axios
      .get("/date/" + cookieParser.getCookieByName("email") + "?date=" + date, {
        headers: {
          Authorization: cookieParser.getCookieByName("token"),
        },
      })
      .then((response) => {
        document.cookie = "token=" + response.data.token;
        setFetchDiaryAlready(true);
        // console.log(response.data.diaryArray.length);

        if (response.data.diaryArray.length === 0) {
          setDiarys("No Diary");
        } else {
          // console.log(response.data.diaryArray)
          response.data.diaryArray.map((folder) => {
            folder.forEach((diary) => {
              // this is use Cards to render Card
              // tmp.push(<Cards key={diarys.map(diary=>diary._id)} items={diarys} selectedFolder={folder.folderName} />)
              // this is directly render Card
              console.log("in Calender Page's diary is ")
              console.log(diary)
                tmp.push(
                  <Card
                    key={diary._id}
                    selectedFolder={diary.parentFolder}
                    items={diary}
                    onPassArticleLink={passArticleLink}
                    onPassReRender={passReRender}
                    onAlertSuccess={alertSuc} onAlertFail={alertFail}
                  />
                );
            });
          });
          setDiarys(tmp);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Paper>
      {redirect ? <Navigate to={"/login"} /> : ""}
      {redirectArticle ? <Navigate to={enterLink} /> : ""}
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <Grid item xs={12} md={5}>
          <p style={{ padding: 30 }}>choose one day</p>
          <LocalizationProvider id="calender" dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              // orientation="landscape"
              allowSameDateSelection={true}
              openTo="day"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              // onChange={selectedDate}
              toolbarTitle=""
              loading={!fetchDiaryAlready}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid sx={{ padding: "1rem" }} item xs={12} md={7}>
          {/* <div id='content'></div> */}
          {fetchDiaryAlready ? (
            diarys === "No Diary" ? (
              <p style={{ padding: 30 }}>No Diary</p>
            ) : (
              diarys
            )
          ) : (
            <CircularProgress color="success" />
          )}
        </Grid>
      </Grid>
      <Snackbar open={openFail} autoHideDuration={2000} onClose={handleCloseFail}>
                <Alert onClose={handleCloseFail} severity="error" sx={{ width: '100%' }}>
                    {toastMsg}
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={2000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                    {toastMsg}
                </Alert>
            </Snackbar>
    </Paper>
  );
};

export default CalenderSearchPage;
