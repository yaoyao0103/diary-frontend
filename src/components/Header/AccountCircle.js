import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleSharp from "@material-ui/icons/AccountCircleSharp";
import { IconButton, ListItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CookieParser from '../CookieParser/CookieParser';
import LogInOrOutButton from './LogInOrOutButton';
import ModeSwitch from './ModeSwitch';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ListItemIcon from '@mui/material/ListItemIcon';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Logout from '@mui/icons-material/Logout';
import { Divider } from '@mui/material';
export default function AccountCircle(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLogin, setIsLogin] = React.useState("LogIn");
  let cookieParser = new CookieParser(document.cookie);
  let navigate = useNavigate();
  React.useEffect(() => {
    console.log("in header");
    console.log(cookieParser.getCookieByName('token'));

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
  const goFav = () => {
    navigate("/favorite");
  }
  const goRestPW = () => {
    navigate("/resetpassword");
  }

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
    // console.log(event.target.outerText);
    setAnchorEl(null);
  };

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

        {isLogin === "LogOut" ? (
          <>
            <MenuItem onClick={() => { handleClose(); goRestPW(); }}>
              {/* <Link to={"/resetpassword"} replace> */}
                <ListItemIcon>
                  <VpnKeyIcon fontSize="small" />
                </ListItemIcon>
                  ResetPassword
              {/* </Link> */}
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); goFav(); }}>
              {/* <Link to={"/favorite"} replace> */}
                <ListItemIcon>
                  <FavoriteIcon fontSize="small" />
                </ListItemIcon>
                FavoritePage
              {/* </Link> */}
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
            {/* <MenuItem onClick={clickLogOut}>{isLogin}</MenuItem> */}
            <Divider />
          </>)
        :<></>}
        <MenuItem>
          <LogInOrOutButton />
        </MenuItem>
      </Menu>
    </div>
  );
}
