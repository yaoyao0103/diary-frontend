import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios/axios";
import Card from "../Cards/Card";
import CookieParser from "../CookieParser/CookieParser";
import { Navigate } from "react-router-dom";

const SearchDiaryPage = () => {
  let searchKeyWord = useParams();
  const [diarys, setDiarys] = useState([]);
  const [render, setRender] = useState(false);
  let tmp = [];
  const [redirectArticle, setRedirectArticle] = useState(false);
  const [enterLink, setEnterLink] = useState(false);
  const [reRender, setReRender] = useState(false);
  const cookieParser = new CookieParser(document.cookie);
  // console.log("render");
  // console.log(diarys);
  // const email = "allen3325940072@gmail.com";
  const email = cookieParser.getCookieByName("email");
  useEffect(() => {
    // console.log(diarys)
    // setRender(false);
    search();
  }, [searchKeyWord,reRender]);

  const passArticleLink = (enteredLink) => {
    setEnterLink(enteredLink);
    setRedirectArticle(true);
  };
  const passReRender = (enteredBool) => {
    setReRender(enteredBool);
  }

  const search = () => {
    axios
      .get(
        `/search/${email}?search_query=${searchKeyWord.keyWord}`,
        {
          headers: {
            Authorization: cookieParser.getCookieByName("token"),
          },
        }
      )
      .then((res) => {
        document.cookie = "token=" + res.data.token;
        // console.log(res.data.diaryArray[0]);
        if (res.data.diaryArray.length > 0) {
          res.data.diaryArray.forEach((element) => {
            // console.log("element");
            // console.log(element);
            if (element.length !== 0) {
              element.forEach((diary) => {
                // console.log(diary[0]);
                // console.log(diary[0]._id);
                // console.log(diary[0].parentFolder);
                // console.log(diary[0].title);

                tmp.push(
                  // <SearchCard
                  //   key={diary._id}
                  //   inFolder={diary.parentFolder}
                  //   items={diary}
                  // />
                  <Card
                    key={diary[0]._id}
                    items={diary[0]}
                    selectedFolder={diary[0].parentFolder}
                    onPassArticleLink={passArticleLink}
                    onPassReRender={passReRender}
                  />
                );
              });
              setRender(true);
            } else {
              setRender(false);
            }
          });

          setDiarys(tmp);
        }
      })
      .catch((e) => console.log(e));
    // console.log(searchKeyWord.keyWord);
  };
  // console.log(render)
  return (
    <Paper>
      {!render ? "no diary" : diarys}
      {redirectArticle ? <Navigate to={enterLink} /> : ""}
    </Paper>
    // diarys.map((diary) => {
    //     <SearchCard items={diary} />
    // })
  );
};

export default SearchDiaryPage;
