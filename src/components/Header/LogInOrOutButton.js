import { Button } from "@material-ui/core";
import CookieParser from "../CookieParser/CookieParser";
import { useCookies } from 'react-cookie';
import { useEffect } from "react";
import { ListItem } from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';
import LoginIcon from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import Login from "@mui/icons-material/Login";
const LogInOrOutButton = () => {
  const [cookies, removeEmail] = useCookies(["email"]);
  const [token, removeToken] = useCookies(["token"]);
  let navigate = useNavigate();
  function handleRemoveCookie() {
    removeEmail('email');
    removeToken('token');
    goLogin();
  }

  function goLogin() {
    navigate("/login");
  }

  const cookieParser = new CookieParser(document.cookie);

  useEffect(() => {

    if ((cookieParser.getCookieByName('token') === "undefined") || (cookieParser.getCookieByName('token') === null)) {
      console.log("fail");
    }
    else {
      if (cookieParser.getCookieByName('email') === "undefined" || (cookieParser.getCookieByName('email') === null)) {
        console.log("fail");

      } else {
        console.log("success");
      }
    }
  }, [])


  if ((cookieParser.getCookieByName('token') == "undefined") | (cookieParser.getCookieByName('token') == null)) {
    console.log("fail");
    console.log(cookieParser.getCookieByName('email'));
    console.log(cookieParser.getCookieByName('token'));
    return (
      <ListItem
        className="ch"
        variant="contained"
        // onClick={() => {
        //     console.log(props.isLogin);
        // }}
        onClick={goLogin}
        size="small"
        // sx={{ m: 2 }}
      ><ListItemIcon>
      <Login fontSize="small" />
    </ListItemIcon>
        登入
      </ListItem>
    )
  }
  else {
    if ((cookieParser.getCookieByName('email') == "undefined") | (cookieParser.getCookieByName('email') == null)) {
      console.log("fail");
      console.log(cookieParser.getCookieByName('email'));
      console.log(cookieParser.getCookieByName('token'));
      return (
        <ListItem
          variant="contained"
          // onClick={() => {
          //     console.log(props.isLogin);
          // }}
          onClick={goLogin}
          size="small"
          ><ListItemIcon>
          <Login fontSize="small" />
        </ListItemIcon>
          登入
          </ListItem>
      )
    } else {
      console.log("success");
      console.log(cookieParser.getCookieByName('email'));
      console.log(cookieParser.getCookieByName('token'));
      return (
        <ListItem
          variant="contained"
          onClick={handleRemoveCookie}
          
          ><ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
          登出
          </ListItem>
      )

    }
  }
}

export default LogInOrOutButton;