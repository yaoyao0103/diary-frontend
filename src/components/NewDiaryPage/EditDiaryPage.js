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
import { useParams } from "react-router";
import { Navigate } from "react-router-dom";
import CookieParser from "../CookieParser/CookieParser";
const EditDiaryPage = () => {
  //TODO: fileUpload's loading and more UX

  let { inFolder, diaryName } = useParams();
  const [previousDiaryName, setPreviousDiaryName] = useState("");
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
  let cookieParser = new CookieParser(document.cookie);

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

        setFolder(inFolder);
        setPreviousDiaryName(diaryName);
        setShouldRedirect(false);
        axios
          .get(
            `/user/${cookieParser.getCookieByName(
              "email"
            )}/${inFolder}/${diaryName}`,
            {
              headers: {
                Authorization: cookieParser.getCookieByName("token"),
              },
            }
          )
          .then((res) => {
            console.log(
              `/user/${cookieParser.getCookieByName(
                "email"
              )}/${inFolder}/${diaryName}`
            );
            res = res.data.diary;
            res.title ? setTitle(res.title) : setTitle("");
            res.date ? setDate(new Date(res.date)) : setDate(new Date());
            setContent(res.content);
            res.tag ? setTag(res.tag) : setTag([]);
            res.tag
              ? setTagsString("#" + res.tag.join(" #"))
              : setTagsString("");
            res.filesURL ? setFilesURL(res.filesURL) : setFilesURL([]);
            res.picURL ? setPicURL(res.picURL) : setPicURL([]);
            res.videoURL ? setVideoURL(res.videoURL) : setVideoURL([]);
            res.isFavored ? setIsFavored(res.isFavored) : setIsFavored(false);
            res.markdown ? setMarkdown(res.markdown) : setMarkdown("");
            // console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    // console.log(email + ", " + diaryName + ", " + inFolder);

    // setTagsString("#" + tag.join(" #"));
    // console.log("str"+tagsString);
  }, []);

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
    setData(data.append("myfile", enteredFile));
    // data.append("myfile", enteredFile);
    axios
      .post("/fileupload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: cookieParser.getCookieByName("token"),
        },
      })
      .then((response) => {
        // console.log(response.data.url);
        picURL.push(response.data.url);
      })
      .catch((error) => console.log(error));
  };
  const storeDiary = (e) => {
    console.log("in edit diary page folder");
    console.log(folder);
    e.preventDefault();
    // console.log("title is " + title);
    // console.log("date is " + date.toISOString());
    // console.log("folderName is " + folder);
    // console.log("content is " + content);
    // console.log("tagsString is " + tagsString);

    setTag(tagsString.split("#").map((tag) => tag.trim()));
    // console.log("tagsss is " + tag);

    let retag = tagsString.split("#").map((tag) => tag.trim());
    if (retag[0] === "") retag.shift();

    // console.log("retags is " + retag + " " + retag.length);
    // console.log(picURL);

    axios
      .put(
        `/user/${cookieParser.getCookieByName(
          "email"
        )}/${folder}/${previousDiaryName}`,
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
            'Authorization': cookieParser.getCookieByName("token"),
          },
        }
      )
      .then((response) => {
        document.cookie = "token=" + response.data.token;
        console.log("after stored");
        console.log(
          `/user/${cookieParser.getCookieByName(
            "email"
          )}/${folder}/${previousDiaryName}`
        );
        console.log(response);
        setPreviousDiaryName(title);
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
          <Grid item xs={2}>
            <DatePicker date={date} onChangeDate={handleDateChange} />
          </Grid>
          <Grid item xs={10}>
            <FolderChoose
              upper={"EditDiaryPage"}
              folder={folder}
              onChangeFolder={handleFolderChange}
              email={cookieParser.getCookieByName("email")}
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
          <Grid item xs={2}>
            <p style={{ fontSize: "2.5rem" }}>HashTags</p>
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              label="請以#隔開每個hashtag"
              id="tags"
              value={tagsString}
              onChange={handleTagsChange}
            />
          </Grid>
          <Grid item xs={3}>
            <ButtonGroup
              style={{ width: "100%" }}
              className="ButtonGroup"
              variant="text"
            >
              <UploadButton onUploadFile={uploadFile} />
              <Button variant="contained" component="span" onClick={storeDiary}>
                儲存日記
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditDiaryPage;
