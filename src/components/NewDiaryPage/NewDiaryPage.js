import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import DatePicker from "./DatePicker";
import FolderChoose from "./FolderChoose";
import TextArea from "./TextArea";
import UploadButton from "./UploadButton";
import { Button } from "@material-ui/core";
import { ButtonGroup } from "@mui/material";
import Container from "@mui/material/Container";
import axios from "../axios/axios";
import { Navigate } from "react-router-dom";
import CookieParser from "../CookieParser/CookieParser";
const NewDiaryPage = () => {
  //TODO: 修好若沒有換行日記，可能要幫他們自動補換行。
  //TODO: fileUpload's loading and more UX
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [folder, setFolder] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState([]);
  const [tagsString, setTagsString] = useState("");
  const [filesURL, setFilesURL] = useState([]);
  const [picURL, setPicURL] = useState([]);
  const [videoURL, setVideoURL] = useState([]);
  const [isFavored, setIsFavored] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [data, setData] = useState(new FormData());
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [redirect, setRedirect] = React.useState(false);
  //let email = "allen3325940072@gmail.com";
  const [email, setEmail] = useState("");
  const cookieParser = new CookieParser(document.cookie);

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
        setEmail(cookieParser.getCookieByName("email"));
        console.log("success");
      }
    }
  }, []);
  // useEffect(() => {
  //   email = "allen3325940072@gmail.com";
  //   setShouldRedirect(false);
  // }, []);

  useEffect(() => setShouldRedirect(false), [shouldRedirect]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    // console.log(event.target.value);
  };
  const handleDateChange = (enteredDate) => setDate(enteredDate);
  const handleFolderChange = (enteredFolder) => {
    setFolder(enteredFolder);
    // console.log("up:" + enteredFolder);
  };
  const handleContentChange = (enteredContent) => setContent(enteredContent);
  const handleTagsChange = (event) => {
    // console.log(tagsString);
    setTagsString(event.target.value);
  };
  const uploadFile = (enteredFile) => {
    data.append("myfile", enteredFile);
    axios
      .post("/fileupload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: cookieParser.getCookieByName("token"),
        },
      })
      .then((response) => {
        document.cookie = "token=" + response.data.token;
        console.log(response);
        picURL.push(response.data.url);
      })
      .catch((error) => console.log(error));
  };
  const storeDiary = () => {
    // console.log("title is " + title);
    // console.log("date is " + date.toISOString());
    // console.log("folder is " + folder);
    // console.log("content is " + content);
    // console.log("tagsString is " + tagsString);
    setTag(tagsString.split("#").map((tag) => tag.trim()));
    // console.log("tagsss is " + tag);

    let retag = tagsString.split("#").map((tag) => tag.trim());
    if (retag[0] === "") retag.shift();
    // console.log("tags is " + tags[0]);
    // console.log(picUrl);
    axios
      .post(
        `/user/${cookieParser.getCookieByName("email")}/${folder}`,
        {
          title: title,
          content: content,
          date: date.toISOString(),
          tag: retag,
          filesURL: filesURL,
          picURL: picURL,
          videoURL: videoURL,
          isFavored: isFavored,
        },
        {
          headers: {
            Authorization: cookieParser.getCookieByName("token"),
          },
        }
      )
      .then((response) => {
        document.cookie = "token=" + response.data.token;
        console.log("sucess");
        console.log(response);
        setShouldRedirect(true);
      })
      .catch((error) => console.log(error));
  };
  return shouldRedirect ? (
    <Navigate to={`/editDiary/${folder}/${title}`} />
  ) : (
    <Container maxWidth={"lg"}>
      {redirect ? <Navigate to={"/login"} /> : ""}
      <Grid container>
        <Grid item xs={12}>
          <TextField
            style={{
              padding: "0px 0px 30px 0px",
              position: "relative",
              top: "10px",
            }}
            fullWidth
            label="title"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
          direction="row"
          justifyContent="space-around"
          alignItems="flex-start"
          style={{ padding: "0px 0px 20px 0px" }}
        >
          <Grid item xs={12}>
            <DatePicker date={date} onChangeDate={handleDateChange} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid>
            <FolderChoose
              upper={"NewDiaryPage"}
              folder={folder}
              onChangeFolder={handleFolderChange}
              email={email}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <p>Content</p>
        </Grid>
        <Grid item xs={12}>
          <TextArea content={content} onChangeContent={handleContentChange} />
        </Grid>
        <Grid
          container
          item
          xs={12}
          direction="row"
          justifyContent="space-around"
          alignItems="flex-start"
          style={{ padding: "0px 0px 20px 0px" }}
        >
          <Grid item xs={3} md={2}>
            <p>HashTags</p>
          </Grid>
          <Grid item xs={4} md={8}>
            <TextField
              fullWidth
              label="請以#隔開每個hashtag"
              id="tags"
              value={tagsString}
              onChange={handleTagsChange}
            />
          </Grid>
          <Grid item xs={5} md={2}>
            <ButtonGroup
              style={{ width: "100%" }}
              className="ButtonGroup"
              variant="text"
            >
              <UploadButton onUploadFile={uploadFile} />
              <Button variant="contained" size="medium" onClick={storeDiary}>
                儲存日記
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewDiaryPage;
