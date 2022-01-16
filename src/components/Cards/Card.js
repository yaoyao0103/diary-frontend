// import { Box } from "@material-ui/system";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { CardContent, CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import { CardActions } from "@mui/material";
import { Button } from "@material-ui/core";
import { useNavigate, Navigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "../axios/axios";
import CookieParser from "../CookieParser/CookieParser";
import SaveAltIcon from '@mui/icons-material/SaveAlt';

export default function BasicCard(props) {
  let navigate = useNavigate();
  let cookieParser = new CookieParser(document.cookie);
  const email = cookieParser.getCookieByName("email");
  const [url, setURL] = useState("");
  const [isFavored, setIsFavored] = useState("");
  const [redirectToEdit, setRedirectToEdit] = useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  // DIALOG USE
  const [openWarn, setOpenWarn] = React.useState(false);
  const [delFolderName, setDelFolderName] = React.useState("");
  const handleClickOpen = () => {
    setOpenWarn(true);
  };
  const handleClose = () => {
    setOpenWarn(false);
  };

  let tmp = "a/";
  let a = "";
  useEffect(() => {
    console.log("in card.")
    let folder = props.selectedFolder;
    let title = props.items.title;
    console.log("render")
    axios.get(`user/${email}/${folder}/${title}`, {
      headers: {
        'Authorization': cookieParser.getCookieByName("token"),
      }
    })
      .then(res => {
        document.cookie = "token=" + res.data.token;
        console.log(res.data.diary.isFavored);
        res.data.diary.isFavored === true ? setIsFavored("red") : setIsFavored("");
      })
      .catch(e => console.log(e))
    tmp += props.items.picURL[0];
    tmp = tmp.replace("/file/d/", "/uc?id=");
    tmp = tmp.substring(0, tmp.search("/view"));
    tmp = tmp.replace("a/", "");
    console.log(tmp);
    setURL(tmp);
  });



  const startDel = () => {
    setOpenWarn(true);
  }

  const passFavored = (enteredName, enteredFolder) => {
    props.onPassFavored(enteredName, enteredFolder);
  }

  const deleteFolder = () => {
    let folder = props.selectedFolder;
    let title = props.items.title;
    console.log("delete diary.");
    axios.delete(`/user/${email}/${folder}/${title}`, {
      headers: {
        'Authorization': cookieParser.getCookieByName("token"),
      }
    })
      .then((res) => {
        // props.items.isFavored = (!props.items.isFavored);
        console.log("delete ready.");
        // console.log(res.data);
        document.cookie = "token=" + res.data.token;
        console.log("success del dia");
        // setReRender(true);
        props.onPassReRender(true);
        props.onAlertSuccess("Success Delete Diary");
        // setToastMsg("Success Delete Diary");
      })
      .catch((err) => {
        console.log(err);
        // setOpenFail(true);
        // setToastMsg("Fail Delete Diary");
        props.onAlertFail("Fail Delete Diary");
      });
  }

  const editDiary = () => {
    setRedirectToEdit(true);
  }

  const changeFavored = () => {
    //TODO: change isFavored
    let folder = props.selectedFolder;
    let title = props.items.title;
    // console.log(`${folder}/${title}`)
    // console.log("enter in changeFavored.")
    axios.put(`/isFavored/${email}/${folder}`,
      {
        diaryTitle: title,
      },
      {
        headers: {
          'Authorization': cookieParser.getCookieByName("token"),
        },
      })
      .then((response => {
        isFavored === "" ? setIsFavored("red") : setIsFavored("");
        document.cookie = "token=" + response.data.token;
        props.onPassReRender(true);
        // console.log(response);
      }))
      .catch(e => {
        console.log(e);
      })
    // isFavored === ""?setIsFavored("red"):setIsFavored("");
  }

  const generateLink = () => {
    let folder = props.selectedFolder;
    let title = props.items.title;
    console.log("folder is " + folder + ". title is " + title);
    // localhost/shareLink/:email/:folderName/:title
    axios
      .get(`shareLink/${email}/${folder}/${title}`, {
        headers: {
          Authorization: cookieParser.getCookieByName("token"),
        },
      })
      .then((res) => {
        console.log(res);
        // let path = "localhost:3000";
        let path = "https://diary-frontend-app.herokuapp.com";
        path += "/ShareDiaryPage/" + res.data.encryptedPath;
        console.log(path);
        document.cookie = "token=" + res.data.token;
        navigator.clipboard.writeText(path).then(
          () => {
            console.log("clipboard successfully set");
            a = "clipboard successfully set";
            setOpenSuccess(true);
            // setToastMsg("Link copied to clipboard");
            props.onAlertSuccess("Link copied to clipboard");
          },
          () => {
            console.log("clipboard write failed");
            // setToastMsg("Link copy failed");
            props.onAlertFail("Link copy failed");
          }
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // const navigateToSave = () => {
  //   let folder = props.selectedFolder;
  //   let title = props.items.title;
  //   console.log("folder is " + folder + ". title is " + title);
  //   // localhost/shareLink/:email/:folderName/:title
  //   axios
  //     .get(`shareLink/${email}/${folder}/${title}`, {
  //       headers: {
  //         Authorization: cookieParser.getCookieByName("token"),
  //       },
  //     })
  //     .then((res) => {
  //       document.cookie = "token=" + res.data.token;
  //       console.log(res);
  //       // let path = "localhost:3000";
  //       // let path = "https://diary-frontend-app.herokuapp.com";
  //       let path = res.data.encryptedPath;
  //       console.log(path);
  //       navigate(`/exportDiary/${path}`);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  //  export JSOM
  function export2json() {
    axios
      .get(
        `/user/${cookieParser.getCookieByName(
          "email"
        )}/${props.selectedFolder}/${props.items.title}`,
        {
          headers: {
            Authorization: cookieParser.getCookieByName("token"),
          },
        }
      )
      .then((res) => {
        document.cookie = "token=" + res.data.token;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(res.data.diary, null, 2)], {
          type: "text/plain"
        }));
        a.setAttribute("download", "data.json");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // console.log(res.data.token)
      })
      .catch((err) => {
        console.log(err);
      });
    // const a = document.createElement("a");
    // a.href = URL.createObjectURL(new Blob([JSON.stringify(diaryJson, null, 2)], {
    //   type: "text/plain"
    // }));
    // a.setAttribute("download", "data.json");
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
  }

  const enterArticle = () => {
    console.log("enter article");
    props.onPassArticleLink(
      `/DiaryPage/${props.selectedFolder}/${props.items.title}`
    );
  };

  return (
    <Card variant="outlined">
      {redirectToEdit ? <Navigate to={`/editDiary/${props.selectedFolder}/${props.items.title}`} /> : ""}
      {/* {reRender ? <Navigate to={`/`} /> : ""} */}
      <CardContent>
        <Typography
          sx={{ cursor: "pointer" }}
          onClick={enterArticle}
          variant="h5"
          component="div"
        >
          {props.items.title}
        </Typography>
        <Typography
          onClick={enterArticle}
          sx={{ mb: 1.5, cursor: "pointer" }}
          color="text.secondary"
          component={"div"}
        >
          {new Date(props.items.date).toDateString()}
        </Typography>
        {props.items.picURL.length === 0 ? (
          ""
        ) : (
          <CardMedia
            component="img"
            height="300"
            image={url}
            alt={props.items.title + "'s picture is dead."}
            onClick={enterArticle}
            sx={{ cursor: "pointer" }}
          />
        )}
        <div
          style={{ cursor: "pointer" }}
          onClick={enterArticle}
          dangerouslySetInnerHTML={{
            __html: props.items.markdown.substring(0, 20),
          }}
        ></div>
      </CardContent>
      <CardActions disableSpacing>

        <IconButton onClick={changeFavored} aria-label="add to favorites">
          <FavoriteIcon sx={{ color: isFavored }} />
        </IconButton>

        <IconButton onClick={generateLink} aria-label="share">
          <ShareIcon />
        </IconButton>
        {/* <Button size="small">
                    <Link to={`/DiaryPage/${props.selectedFolder}/${props.items.title}`}><p style={{ fontSize: "1rem" }}>See More</p></Link>
                </Button> */}
        {/* <Button size="small">
          <Link to={`/editDiary/${props.selectedFolder}/${props.items.title}`}>
            <p style={{ fontSize: "1rem" }}>Edit Diary</p>
          </Link>
        </Button> */}
        <IconButton aria-label="edit" onClick={editDiary}>
          <CreateIcon />
        </IconButton>
        <IconButton>
          <SaveAltIcon aria-label="save" onClick={export2json} />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={startDel}>
          <DeleteIcon />
        </IconButton>
        {/* <Typography color="text.secondary">
                    {props.items.tag.length > 0 && props.items.tag[0].length > 0 ? props.items.tag.join("#") : ""}
                </Typography> */}
      </CardActions>

      <Dialog
        open={openWarn}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"是否刪除這篇日記?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            真的要刪除這篇日記嗎?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => { handleClose(); setDelFolderName(""); }}>否</Button>
          <Button variant="contained" onClick={() => { handleClose(); deleteFolder(); }} autoFocus>
            是的(此操作無法復原)
          </Button>
        </DialogActions>
      </Dialog>
    </Card>


  );
}
