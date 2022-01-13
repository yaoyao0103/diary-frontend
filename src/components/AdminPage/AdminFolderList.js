import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import {useState } from "react";
import { ListItemSecondaryAction } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@mui/material/TextField";
import { makeStyles, withStyles } from "@mui/styles";
import CreateIcon from "@mui/icons-material/Create";
import axios from "../axios/axios";
import CookieParser from "../CookieParser/CookieParser";

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
  const email = cookieParser.getCookieByName("email");
  const classes = useStyles();
  const [editFolderIdx, setEditFolderIdx] = useState(-1);
  const [editingFolder, setEditingFolder] = useState(false);
  const [editingFolderName, setEditingFolderName] = useState("");
  const handleFolderChange = (e) => {
    e.preventDefault();
    props.onChangeFolder(props.folderIdx);
    console.log("inAdminfolder list", props.folderIdx);
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

  function postEditFolder() {
    if (editingFolderName === "" || editingFolderName.trim() === "") {
      setEditingFolder(false);
      return;
    }
    axios //localhost/user/:email/:folderName
      .put(
        `/user/${email}/${props.folderName}`,
        {
          folderName: editingFolderName,
        },
        {
          headers: {
            "Authorization": cookieParser.getCookieByName("token"),
          },
        }
      )
      .then((res) => {
        console.log("in folderList' edit folder");
        document.cookie = "token=" + res.data.token;
        console.log(editingFolderName);
        console.log(res.data);
        setEditingFolder(false);
      })
      .catch((err) => {
        console.log(err);
      });
    props.onRender();
  }
  return editingFolder ? (
    <ListItem
      secondaryAction={
        <IconButton edge="end"  onClick={postEditFolder}>
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
      secondaryAction={
        <IconButton edge="end" onClick={deleteFolder}>
          <CloseIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton>
        <ListItemText primary={props.folderName} />
      </ListItemButton>

      <ListItemSecondaryAction>
        <IconButton aria-label="edit" onClick={editFolder}>
          <CreateIcon fontSize="small" />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={deleteFolder}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}