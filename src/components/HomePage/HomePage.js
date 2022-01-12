import { Button, Grid, Link } from "@material-ui/core";
import { useEffect, useState } from "react";
import Cards from "../Cards/Cards";
import { Container, TextField } from "@mui/material";
import FolderPage from "../FolderPage/FolderPage";
import "./HomePage.css";
import axios from "../axios/axios";
import CookieParser from "../CookieParser/CookieParser";
import { Navigate } from "react-router-dom";
import React from "react";

function HomePage(props) {
  // const email = "allen3325940072@gmail.com";

  const [folder, setFolder] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(-1);
  const [redirect, setRedirect] = React.useState(false);
  const [redirectArticle, setRedirectArticle] = React.useState(false);
  const [enterLink, setEnterLink] = React.useState(false);
  let cookieParser = new CookieParser(document.cookie);
  useEffect(() => {
    if (
      cookieParser.getCookieByName("token") == "undefined" ||
      cookieParser.getCookieByName("token") == null
    ) {
      console.log("fail");
      setRedirect(true);
    } else {
      if (
        cookieParser.getCookieByName("email") == "undefined" ||
        cookieParser.getCookieByName("email") == null
      ) {
        console.log("fail");
        setRedirect(true);
      } else {
        console.log("in get folder in HomePage.");

        axios
          .get("/user/" + cookieParser.getCookieByName("email") + "/folder", {
            headers: {
              'Authorization': cookieParser.getCookieByName("token"),
            }
          })

          .then((res) => {
            console.log("fetch ready.");
            // console.log(res.data);
            document.cookie = "token=" + res.data.token;
            // console.log(res);
            setFolder(res.data.folder);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, []); ///get folder list in the beginning

  useEffect(() => {
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
          <Grid item xs={2} sm={3} md={2}>
            <FolderPage
              folder={folder}
              hasUpper={true}
              onChangeFolder={handleFolderChange}
            />
          </Grid>
          <Grid item xs={10} sm={9} md={8}>
            { selectedFolder < folder.length ? (
              folder.length > 0 && selectedFolder !== -1 ? (
                <Cards
                  items={folder[selectedFolder].diary}
                  selectedFolder={folder[selectedFolder].folderName}
                  onPassArticleLink={passArticleLink}
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
    </div>
  );
}

export default HomePage;
