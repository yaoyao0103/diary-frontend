import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios/axios";
import Card from "../Cards/Card";
import CookieParser from "../CookieParser/CookieParser";
import { Navigate } from "react-router-dom";
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';

const SearchDiaryPage = () => {
  let searchKeyWord = useParams();
  const [diarys, setDiarys] = useState([]);
  const [render, setRender] = useState(false);
  let tmp = [];
  const [redirectArticle, setRedirectArticle] = useState(false);
  const [enterLink, setEnterLink] = useState(false);
  const [reRender, setReRender] = useState(false);
  const cookieParser = new CookieParser(document.cookie);
  
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const email = cookieParser.getCookieByName("email");
  useEffect(() => {
    search();
  }, [searchKeyWord, reRender]);

  const passArticleLink = (enteredLink) => {
    setEnterLink(enteredLink);
    setRedirectArticle(true);
  };
  const passReRender = (enteredBool) => {
    setReRender(enteredBool);
  }

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


  const search = () => {
    tmp = [];
    axios
      .get(
        `/search/${email}?search_query=${searchKeyWord.keyWord}`,
        {
          headers: {
            Authorization: cookieParser.getCookieByName("token"),
          },
        }
      )
      .then((res) => {
        document.cookie = "token=" + res.data.token;
        if (res.data.diaryArray.length > 0) {
          res.data.diaryArray.forEach((element) => {
            if (element.length !== 0) {
              element.forEach((diary) => {

                tmp.push(
                  // <SearchCard
                  //   key={diary._id}
                  //   inFolder={diary.parentFolder}
                  //   items={diary}
                  // />
                  <Card
                    key={diary._id}
                    items={diary}
                    selectedFolder={diary.parentFolder}
                    onPassArticleLink={passArticleLink}
                    onPassReRender={passReRender}
                    onAlertSuccess={alertSuc}
                    onAlertFail={alertFail} 
                  />
                );
              });
              setRender(true);
            }
          });
          setDiarys(tmp);
        }
        if(tmp.length == 0){
          setRender(false);
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <Paper>
      {!render ? "no diary" : diarys}
      {redirectArticle ? <Navigate to={enterLink} /> : ""}
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
    // diarys.map((diary) => {
    //     <SearchCard items={diary} />
    // })
  );
};

export default SearchDiaryPage;
