import { useEffect } from "react";
import CookieParser from "../CookieParser/CookieParser";
function AboutPage() {
  useEffect(() => {
   let cookieParser = new CookieParser(document.cookie);
    if((cookieParser.getCookieByName('token')==="undefined")|(cookieParser.getCookieByName('token')===null)){
      console.log("fail");
    }
    else{
      if(cookieParser.getCookieByName('email')=="undefined"|(cookieParser.getCookieByName('email')===null)){
          console.log("fail");
          
      }else{
        console.log("success");
      }
    }
  },[])
  return (
    <div>
      <main>
        <h2>About Page</h2>
      </main>
    </div>
  );
}

export default AboutPage;
