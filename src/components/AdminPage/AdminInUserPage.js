import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import Cards from "./AdminCards/Cards";
import { Container } from "@mui/material";
import AdminFolderPage from "./AdminFolderPage";
import "../HomePage/HomePage.css";
import axios from "../axios/axios";
import CookieParser from "../CookieParser/CookieParser";
import { Navigate } from "react-router-dom";
import React from "react";
import { useParams } from "react-router";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

function AdminInUserPage(props) {
  // const email = "allen3325940072@gmail.com";
  let { email } = useParams();
  const [folder, setFolder] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(-1);
  const [redirect, setRedirect] = React.useState(false);
  const [redirectArticle, setRedirectArticle] = React.useState(false);
  const [enterLink, setEnterLink] = React.useState(false);
  const [reRender, setReRender] = useState(false);
  let cookieParser = new CookieParser(document.cookie);
  const [openSwitchUserAlert, setOpenSwitchUserAlert] = React.useState(false);

  const handleClose = () => {
    setOpenSwitchUserAlert(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  useEffect(() => {
    setOpenSwitchUserAlert(true);
    setReRender(false);
    if (
      cookieParser.getCookieByName("token") == "undefined" ||
      cookieParser.getCookieByName("token") == null
    ) {
      setRedirect(true);
    } else {
      if (
        cookieParser.getCookieByName("email") == "undefined" ||
        cookieParser.getCookieByName("email") == null
      ) {
        setRedirect(true);
      } else {

        axios
          .get("/user/" + email + "/folder", {
            headers: {
              'Authorization': cookieParser.getCookieByName("token"),
            }
          })

          .then((res) => {
            document.cookie = "token=" + res.data.token;
            setFolder(res.data.folder);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [reRender]); ///get folder list in the beginning

  useEffect(() => {
    setReRender(false);
    if (folder.length > 0 && selectedFolder === "") {
      setSelectedFolder(-1);
    }
  }, [folder, selectedFolder]); //if folder is loaded select the first as default

  const handleFolderChange = (e) => {
    setSelectedFolder(e);
  };

  const passArticleLink = (enteredLink) => {
    setEnterLink(enteredLink);
    setRedirectArticle(true);
  };
  const passReRender = (enteredBool) => {
    setReRender(enteredBool);
  }
  const passSetDefault = () => {
    setSelectedFolder(-1);
  }
  return (
    <div>
 {redirect ? <Navigate to={"/login"} /> : ""}
      {redirectArticle ? <Navigate to={enterLink} /> : ""}
      <Container>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={3} md={2}>
            <AdminFolderPage
              folder={folder}
              hasUpper={true}
              onChangeFolder={handleFolderChange}
              onPassSetDefault={passSetDefault}
            />
          </Grid>
          <Grid item xs={10} sm={9} md={8}>
            {selectedFolder < folder.length ? (
              folder.length > 0 && selectedFolder !== -1 ? (
                <Cards
                  items={folder[selectedFolder].diary}
                  selectedFolder={folder[selectedFolder].folderName}
                  onPassArticleLink={passArticleLink}
                  onPassReRender={passReRender}
                />
              ) : (
                <p className="noDiary">No Selected folder</p>
              )
            ) : (
              <p className="noDiary">No Diary</p>
            )}
          </Grid>
          <Grid item xs={0} sm={0} md={2}></Grid>
        </Grid>
      </Container>
      <Snackbar
        open={openSwitchUserAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        message={`切換到用戶${email}的頁面`} 
        action={action}
      />
    </div>
  );
}

export default AdminInUserPage;


