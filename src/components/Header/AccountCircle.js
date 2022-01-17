import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleSharp from "@material-ui/icons/AccountCircleSharp";
import { IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ListItemIcon from '@mui/material/ListItemIcon';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Divider } from '@mui/material';
import CookieParser from '../CookieParser/CookieParser';
import LogInOrOutButton from './LogInOrOutButton';
import ModeSwitch from './ModeSwitch';
import axios from '../axios/axios';

export default function AccountCircle(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLogin, setIsLogin] = React.useState("LogIn");
  const [isAdmin, setIsAdmin] = React.useState(false);
  let cookieParser = new CookieParser(document.cookie);
  let navigate = useNavigate();
  React.useEffect(() => {

    if ((cookieParser.getCookieByName('token') === "undefined") ||
      (cookieParser.getCookieByName('token') === null) ||
      (cookieParser.getCookieByName('email') === "undefined") ||
      (cookieParser.getCookieByName('token') === null)) {
      setIsLogin("LogIn");
    }
    else {
      setIsLogin("LogOut");
    }
  })
  React.useEffect(() => {
    // console.log(isLogin);
    if (isLogin == "LogOut") {
      axios
        .get("/user/" + cookieParser.getCookieByName("email"),
          {
            headers: {
              Authorization: cookieParser.getCookieByName("token"),
            },
          }
        )
        .then((res) => {
          if (res.data.user.isAdmin === false) {
            // console.log("not is admin")
            setIsAdmin(false);
          } else {
            // console.log("is admin")
            // console.log(isAdmin);
            setIsAdmin(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  const changeDarkMode = (enteredDarkMode) => {
    const darkMode = enteredDarkMode;
    props.onChangeDarkMode(enteredDarkMode);
    console.log("In HeaderTmp is " + darkMode);
  }
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const goFav = () => {
    navigate("/favorite");
  }
  const goRestPW = () => {
    navigate("/resetpassword");
  }
  const goAdmin = () => {
    navigate("/user");
  }

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {/* Dashboard */}
        <AccountCircleSharp fontSize="large" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <ModeSwitch
            onChangeDarkMode={changeDarkMode}
            sx={{ m: 4 }} />
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); goRestPW(); }}>
          <ListItemIcon>
            <VpnKeyIcon fontSize="small" />
          </ListItemIcon>
          ResetPassword
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); goFav(); }}>
          <ListItemIcon>
            <FavoriteIcon fontSize="small" />
          </ListItemIcon>
          FavoritePage
        </MenuItem>
        {isAdmin ?
          <MenuItem onClick={() => { handleClose(); goAdmin(); }}>
            <ListItemIcon>
              <SupervisorAccountIcon fontSize="small" />
            </ListItemIcon>
            AdminPage
          </MenuItem>
          : ""
        }
        <Divider />
        {/* <MenuItem onClick={handleClose}>
          <Link to={"/resetpassword"} replace>
            ResetPassword
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={"/favorite"} replace>
            FavoritePage
          </Link>
        </MenuItem> */}
        <MenuItem>
          <LogInOrOutButton />
        </MenuItem>
      </Menu>
    </div>
  );
}
