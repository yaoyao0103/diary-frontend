import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import axios from "../axios/axios";
import TextArea from "../NewDiaryPage/TextArea";
import UploadButton from "../NewDiaryPage/UploadButton";
import DatePicker from "../NewDiaryPage/DatePicker";
import { Button } from "@material-ui/core";
import { ButtonGroup } from "@mui/material";
import FolderChoose from "../NewDiaryPage/FolderChoose";
import { useParams } from "react-router";
import { Navigate } from "react-router-dom";
import "../BrowseDiaryPage/DiaryPage.css";
import CookieParser from "../CookieParser/CookieParser";
import Divider from "@mui/material/Divider";
import Swal from 'sweetalert2'

const AdminDiaryPage = () => {

  let { email, inFolder, diaryName } = useParams();
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
  const [uploadFileLoading, setUploadFileLoading] = React.useState(false);
  const [uploadFileSuccess, setUploadFileSuccess] = React.useState(false);
  let cookieParser = new CookieParser(document.cookie);

  useEffect(() => {
    if (
      cookieParser.getCookieByName("token") === "undefined" ||
      cookieParser.getCookieByName("token") === null
    ) {
      setRedirect(true);
    } else {
      if (
        cookieParser.getCookieByName("email") === "undefined" ||
        cookieParser.getCookieByName("email") === null
      ) {
        setRedirect(true);
      } else {

        setFolder(inFolder);
        setPreviousDiaryName(diaryName);
        setShouldRedirect(false);
        axios
          .get(
            `/user/${email}/${inFolder}/${diaryName}`,
            {
              headers: {
                Authorization: cookieParser.getCookieByName("token"),
              },
            }
          )
          .then((res) => {
            res = res.data.diary;
            res.title ? setTitle(res.title) : setTitle("");
            res.date ? setDate(new Date(res.date)) : setDate(new Date());
            setContent(res.content.replaceAll("  \n", "\n"));
            res.tag ? setTag(res.tag) : setTag([]);
            res.tag
              ? setTagsString("#" + res.tag.join(" #"))
              : setTagsString("");
            res.filesURL ? setFilesURL(res.filesURL) : setFilesURL([]);
            res.picURL ? setPicURL(res.picURL) : setPicURL([]);
            res.videoURL ? setVideoURL(res.videoURL) : setVideoURL([]);
            res.isFavored ? setIsFavored(res.isFavored) : setIsFavored(false);
            res.markdown ? setMarkdown(res.markdown) : setMarkdown("");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, []);

  useEffect(() => setShouldRedirect(false), [shouldRedirect]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDateChange = (enteredDate) => setDate(enteredDate);
  const handleFolderChange = (enteredFolder) => {
    setFolder(enteredFolder);
  };
  const handleContentChange = (enteredContent) => setContent(enteredContent);
  const handleTagsChange = (event) => {
    setTagsString(event.target.value);
  };
  const uploadFile = (enteredFile) => {
    setData(data.append("myfile", enteredFile));
    setUploadFileLoading(true);
    axios
      .post("/fileupload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: cookieParser.getCookieByName("token"),
        },
      })
      .then((response) => {
        picURL.push(response.data.url);
        setUploadFileSuccess(true);
        setUploadFileLoading(false);
      })
      .catch((error) => console.log(error));
  };
  const storeDiary = (e) => {
    if (date === null) {
      Swal.fire({
        title: "請選擇日期",
        icon: "error",
      });
      return;
    }
    e.preventDefault();

    let temp_title = (title) ? title : document.getElementById("title").value;
    let temp_tags = (tagsString) ? tagsString : document.getElementById("tags").value;
    let temp_content = (content) ? content : document.getElementById("diary_content").value;
    if (temp_title.trim() === "") {
      Swal.fire({
        title: "請輸入標題",
        icon: "error",
      });
      return;
    }
    let my_temp_tags = temp_tags.split("#").map((tag) => tag.trim());
    setTag(my_temp_tags);

    let retag = my_temp_tags;
    if (retag[0] === "") retag.shift();

    axios
      .put(
        `/user/${email}/${folder}/${previousDiaryName}`,
        {
          title: temp_title,
          content: (temp_content.replaceAll("  \n","\n")).replaceAll("\n", "  \n"),
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
        Swal.fire('修改日記成功', '', 'success');
        document.cookie = "token=" + response.data.token;
        setPreviousDiaryName(title);
        setShouldRedirect(true);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire('修改日記失敗', '同個資料夾下不能有相同名稱的日記', 'error');
      });
  };
  return shouldRedirect ? (
    <Navigate to={`/user/${email}`} />
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
          <Grid item xs={5}>
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
          <Grid item xs={12}>
            <p >HashTags</p>
          </Grid>
          <Grid item xs={7} md={10} style={{padding: "5px 0px 0px 0px"}}>
            <TextField
              fullWidth
              label="請以#隔開每個hashtag"
              id="tags"
              value={tagsString}
              onChange={handleTagsChange}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <ButtonGroup
              style={{ width: "100%" }}
              className="ButtonGroup"
              variant="text"
            >
              <UploadButton onUploadFile={uploadFile} loading={uploadFileLoading} success={uploadFileSuccess} />
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

export default AdminDiaryPage;
