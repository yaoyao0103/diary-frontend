import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { ListItemSecondaryAction } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@mui/material/TextField";
import { makeStyles, withStyles } from "@mui/styles";
import CreateIcon from "@mui/icons-material/Create";
import axios from "../axios/axios";
import CookieParser from "../CookieParser/CookieParser";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
}));

const ListItemWithWiderSecondaryAction = withStyles({
  secondaryAction: {
    paddingRight: 96,
  },
})(ListItem);

export default function AdminFolderList(props) {
  // const email = "allen3325940072@gmail.com";
  const cookieParser = new CookieParser(document.cookie);
  const { email } = useParams();
  const classes = useStyles();
  const [editFolderIdx, setEditFolderIdx] = useState(-1);
  const [editingFolder, setEditingFolder] = useState(false);
  const [editingFolderName, setEditingFolderName] = useState("");
  const [onOpen, setOnOpen] = useState(false);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleFolderChange = (e) => {
    e.preventDefault();
    props.onChangeFolder(props.folderIdx);
  };
  const deleteFolder = (e) => {
    e.preventDefault();
    props.onDeleteFolder(props.folderName);
  };
  const editFolder = (e) => {
    e.preventDefault();
    setEditingFolder(true);
    setEditFolderIdx(props.folderIdx);
    // props.onEditFolder(props.folderName);
  };
  const handleEditFolderName = (e) => {
    setEditingFolderName(e.target.value);
  };

  const handleOnClickOpen = () => {
    setOnOpen(true);
  };
  const handleOnClose = () => {
    setOnOpen(false);
  };

  function postEditFolder() {
    let temp_folder_name = editingFolderName
      ? editingFolderName
      : document.getElementById("mui-2").value;
    if (temp_folder_name === "" || temp_folder_name.trim() === "") {
      setEditingFolder(false);
      return;
    }
    axios //localhost/user/:email/:folderName
      .put(
        `/user/${email}/${props.folderName}`,
        {
          folderName: temp_folder_name,
        },
        {
          headers: {
            Authorization: cookieParser.getCookieByName("token"),
          },
        }
      )
      .then((res) => {
        document.cookie = "token=" + res.data.token;
        props.onEditFolder(temp_folder_name, props.folderIdx);
        setEditingFolder(false);
        setOnOpen(true);
        setToastSuccess(true);
        setToastMsg("Folder name changed successfully");
      })
      .catch((err) => {
        console.log(err);
        setOnOpen(true);
        setToastSuccess(false);
        setToastMsg("Folder name change failed");
      });
    props.onRender();
  }
  return (
    <>
      {editingFolder ? (
        <ListItem
          secondaryAction={
            <IconButton edge="end" onClick={postEditFolder}>
              <AddCircleOutlineIcon />
            </IconButton>
          }
        >
          <ListItemText
            primary={
              <TextField
                onChange={handleEditFolderName}
                value={editingFolderName}
                size="small"
              />
            }
          />
        </ListItem>
      ) : (
        <ListItem
          className={classes.root}
          key={props.folderIdx}
          onClick={handleFolderChange}
          disablePadding
        >
          <ListItemButton>
            <ListItemText primary={props.folderName} />
          </ListItemButton>
          {props.folderName === "Uncategorized" ? null : (
            <ListItemSecondaryAction>
              <IconButton aria-label="edit" onClick={editFolder}>
                <CreateIcon fontSize="small" />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={deleteFolder}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      )}
      <Snackbar open={onOpen} autoHideDuration={2000} onClose={handleOnClose}>
        <Alert
          onClose={handleOnClose}
          severity={toastSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {toastMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
