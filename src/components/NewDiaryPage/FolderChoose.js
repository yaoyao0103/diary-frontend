import React, { useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "../axios/axios";
import CookieParser from "../CookieParser/CookieParser";

const FolderChoose = (props) => {
  // let isLogin = false;
  const [isLogin, setIsLogin] = React.useState(false);
  const [folder, setFolder] = React.useState("Uncategorized");
  const [folders, setFolders] = React.useState([]);
  const cookieParser = new CookieParser(document.cookie);
  const fetchFolder = () => {
    axios
      .get(`/user/${props.email}/folder`, {
        headers: {
          'Authorization': cookieParser.getCookieByName("token"),
        }
      })
      .then((response) => {
        document.cookie = "token=" + response.data.token;
        setFolders(response.data.folder);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (
      cookieParser.getCookieByName("token") == "undefined" ||
      cookieParser.getCookieByName("token") == null ||
      cookieParser.getCookieByName("email") == "undefined" ||
      cookieParser.getCookieByName("email") == null
    ) {
      // isLogin = false;
      setIsLogin(false);
    } else {
      // isLogin = true;
      setIsLogin(true);
    }
    if (props.email && isLogin) {
      fetchFolder();
    }
  }, [props.email, isLogin]);
  useEffect(() => {
    if (props.folder) {
      setFolder(props.folder);
    } else setFolder("");
  }, [props.folder]);
  
  const handleFolderChange = (event) => {
    props.onChangeFolder(event.target.value);
    // setFolder(event.target.value);
  };
  return props.upper === "NewDiaryPage" ? (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Choose Folder</InputLabel>
      <Select
        // displayEmpty
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Folder"
        defaultValue={folder ?? "Ucategorized"}
        onChange={handleFolderChange}
      >
        {/* <MenuItem key={0} value={""}></MenuItem> */}
        {folders.map((fold) => (
          fold.folderName.trim() !== "" ? (
          <MenuItem key={fold._id} value={String(fold.folderName)} selected={fold.folderName=="Uncategorized"} >
            {fold.folderName}
            </MenuItem>
          ) : null
        ))}
      </Select>
    </FormControl>
  ) : (
    // <FormControl fullWidth>
    //     <Select
    //         displayEmpty
    //         labelId="demo-simple-select-label"
    //         id="demo-simple-select"
    //         label="Folder"
    //         defaultValue="Loading..."
    //     >
    //         <MenuItem value={"Loading..."} selected={true}>Loading...</MenuItem>
    //     </Select>
    // </FormControl>
    ""
  );
};

export default FolderChoose;
