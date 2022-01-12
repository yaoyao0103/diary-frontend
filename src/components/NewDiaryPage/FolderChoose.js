import React, { useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "../axios/axios";
import CookieParser from "../CookieParser/CookieParser";

const FolderChoose = (props) => {
  // console.log("in FolderChoose");
  // console.log(props)
  // let isLogin = false;
  const [isLogin, setIsLogin] = React.useState(false);
  const [folder, setFolder] = React.useState("");
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
        // console.log(response.data.folder);
        setFolders(response.data.folder);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // console.log('props.email');
    // console.log(props.email)
    // console.log(isLogin)
    // console.log('porps.email', props.email);
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
  // useEffect(() => { console.log('porps.upper', props.upper); }, [props.upper]);
  useEffect(() => {
    // console.log('props.folder');

    // console.log("props.folder:"+props.folder);
    if (props.folder) {
      setFolder(props.folder);
      // console.log("in Folderchoose " + props.folder);
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
        defaultValue={folder ?? ""}
        onChange={handleFolderChange}
      >
        <MenuItem key={0} value={""}></MenuItem>
        {folders.map((fold) => (
          <MenuItem key={fold._id} value={String(fold.folderName)}>
            {fold.folderName}
          </MenuItem>
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
