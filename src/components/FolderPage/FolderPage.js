import { Fragment, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import FolderList from "./FolderList";
import AddIcon from "@mui/icons-material/Add";
import axios from "../axios/axios";
import TextField from "@mui/material/TextField";
import { ListItemText } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CookieParser from "../CookieParser/CookieParser";
import { CookiesProvider } from "react-cookie";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { Navigate } from "react-router-dom";
import React from "react";

const FolderPage = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const email = "allen3325940072@gmail.com";
  const [folder, setFolder] = useState([]);
  const [hasUpper, setHasUpper] = useState(0);
  const [folderAdding, setFolderAdding] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [editFolderName, setEditFolderName] = useState("");
  const [reRender, setReRender] = useState(false);
  const [redirect, setRedirect] = React.useState(false);

  let cookieParser = new CookieParser(document.cookie);

  useEffect(() => {
    setFolderAdding(false);
    setReRender(false);
    if (
      cookieParser.getCookieByName("token") == "undefined" ||
      cookieParser.getCookieByName("token") == null ||
      cookieParser.getCookieByName("email") == "undefined" ||
      cookieParser.getCookieByName("email") == null
    ) {
      console.log("fail");
      // isLogin = false;
      setIsLogin(false);
      setRedirect(true);
    } else {
      console.log("aaaaa");
      // isLogin = true;
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    // console.log(folderAdding);
    setReRender(false);
    if (props.hasUpper !== undefined && props.hasUpper) {
      setHasUpper(true);
    } else {
      setHasUpper(false);
    }
    if (isLogin) {
      axios
        .get("/user/" + cookieParser.getCookieByName("email") + "/folder", {
          headers: {
            "Authorization": cookieParser.getCookieByName("token"),
          },
        })
        .then((res) => {
          console.log("in fetch folder in FolderPage");
          document.cookie = "token=" + res.data.token;
          // console.log(res.data);
          setFolder(res.data.folder);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.folder, props.hasUpper, reRender, isLogin]);

  const [newFolderFail, setNewFolderFail] = useState(false);
  const [newFolderSuccess, setNewFolderSuccess] = useState(false);
  const [delFolderFail, setDelFolderFail] = useState(false);
  const [delFolderSuccess, setDelFolderSuccess] = useState(false);

  function postAddFolder() {
    // console.log(newFolderName);
    console.log("postAddFolder");
    if (
      newFolderName === "" ||
      newFolderName === undefined ||
      newFolderName === null ||
      newFolderName.trim() === "" ||
      isLogin === false
    ) {
      console.log("fail");
      setFolderAdding(false);
      return;
    } else {
      console.log("aaxxxiioosss");
      axios
        .post(
          "/user/" + cookieParser.getCookieByName("email") + "/folder",
          {
            folderName: newFolderName,
          },
          {
            headers: {
              Authorization: cookieParser.getCookieByName("token"),
            },
          }
        )
        .then((res) => {
          document.cookie = "token=" + res.data.token;
          console.log(res.data);
          setFolder([...folder, { folderName: newFolderName, diary: [] }]);
          console.log([...folder, { folderName: newFolderName, diary: [] }]);
          setFolderAdding(false);
          // setReRender(true);
          setNewFolderSuccess(true);
          setNewFolderName("");
        })
        .catch((err) => {
          setNewFolderFail(true);
          console.log(err);
        });
    }
  }
  function onDelFolder(folderName) {
    // console.log("/user/" + cookieParser.getCookieByName("email") + "/${folderName}")
    console.log("/user/" + cookieParser.getCookieByName("email") + `/${folderName}`);
    axios.delete(
      "/user/" + cookieParser.getCookieByName("email") + `/${folderName}`,
      {
        headers: {
          'Authorization': cookieParser.getCookieByName("token"),
        },
      }
    )
      .then((res) => {
        document.cookie = "token=" + res.data.token;
        // console.log(res.data);
        setReRender(true);
        setDelFolderSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setDelFolderFail(true);
      });
  }

  const handleNewFolderFail = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNewFolderFail(false);
  };

  const handleNewFoldereSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNewFolderSuccess(false);
  };

  const handleDelFolderFail = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDelFolderFail(false);
  };

  const handleDelFoldereSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDelFolderSuccess(false);
  };

  const handleFolderChange = (e) => {
    props.onChangeFolder(e); //e is folderName (in folderlist: props.folderName)
  };
  const ignoreHandleFolderChange = (e) => { };

  const handleAddFolder = () => {
    setFolderAdding(true);
  };
  const handleNewFolderName = (e) => {
    setNewFolderName(e.target.value);
    // console.log(e.target.value);
  };

  const handleRender = () => {
    setReRender(true);
  };
  return (
    <>
      {redirect ? <Navigate to={"/login"} /> : ""}
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {folder.map((fold, index) => {
          return (
            <Fragment key={fold._id}>
              {hasUpper ? (
                <FolderList
                  folderName={fold.folderName}
                  folderIdx={index}
                  onChangeFolder={handleFolderChange}
                  onDeleteFolder={onDelFolder}
                  onRender={handleRender}
                />
              ) : (
                <FolderList
                  folderName={fold.folderName}
                  folderIdx={index}
                  onChangeFolder={ignoreHandleFolderChange}
                  onDeleteFolder={onDelFolder}
                  onRender={handleRender}
                />
              )}
              <Divider />
            </Fragment>
          );
        })}
        {folderAdding === false ? (
          <ListItem>
            <ListItemButton inset={"true"}>
              <ListItemIcon onClick={handleAddFolder}>
                <AddIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem
            secondaryAction={
              <IconButton edge="end" onClick={postAddFolder}>
                <AddCircleOutlineIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={
                <TextField
                  onChange={handleNewFolderName}
                  value={newFolderName}
                  size="small"
                />
              }
            />
          </ListItem>
        )}
      </List>
      <Snackbar
        open={newFolderFail}
        autoHideDuration={2000}
        onClose={handleNewFolderFail}
      >
        <Alert
          onClose={handleNewFolderFail}
          severity="error"
          sx={{ width: "100%" }}
        >
          New Folder Fail
        </Alert>
      </Snackbar>
      <Snackbar
        open={newFolderSuccess}
        autoHideDuration={2000}
        onClose={handleNewFoldereSuccess}
      >
        <Alert
          onClose={handleNewFoldereSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          New Folder Successfully.
        </Alert>
      </Snackbar>

      <Snackbar
        open={delFolderFail}
        autoHideDuration={2000}
        onClose={handleDelFolderFail}
      >
        <Alert
          onClose={handleDelFolderFail}
          severity="error"
          sx={{ width: "100%" }}
        >
          Delete Folder Fail
        </Alert>
      </Snackbar>
      <Snackbar
        open={delFolderSuccess}
        autoHideDuration={2000}
        onClose={handleDelFoldereSuccess}
      >
        <Alert
          onClose={handleDelFoldereSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          Delete Folder Successfully.
        </Alert>
      </Snackbar>
    </>
  );
};

export default FolderPage;
