import { Button } from "@material-ui/core";
import CookieParser from "../CookieParser/CookieParser";
import { useCookies } from 'react-cookie';
import { useEffect } from "react";
const LogInOrOutButton = () => {
  const [cookies, removeEmail] = useCookies(["email"]);
  const [token, removeToken] = useCookies(["token"]);
  function handleRemoveCookie() {
    removeEmail('email');
    removeToken('token');
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
      <Button
        className="ch"
        variant="contained"
        // onClick={() => {
        //     console.log(props.isLogin);
        // }}
        href="/login"
        size="small"
        // sx={{ m: 2 }}

      >
        登入
      </Button>
    )
  }
  else {
    if (cookieParser.getCookieByName('email') == "undefined") {
      console.log("fail");
      console.log(cookieParser.getCookieByName('email'));
      console.log(cookieParser.getCookieByName('token'));
      return (
        <Button
          variant="contained"
          // onClick={() => {
          //     console.log(props.isLogin);
          // }}
          href="/login"
          size="small"
        >
          登入
        </Button>
      )
    } else {
      console.log("success");
      console.log(cookieParser.getCookieByName('email'));
      console.log(cookieParser.getCookieByName('token'));
      return (
        <Button
          variant="contained"
          onClick={handleRemoveCookie}
          href="/"
        >
          登出
        </Button>
      )

    }
  }
}

export default LogInOrOutButton;