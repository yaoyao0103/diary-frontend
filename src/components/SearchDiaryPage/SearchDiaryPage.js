import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios/axios";
import Card from "../Cards/Card";
import CookieParser from "../CookieParser/CookieParser";
import SearchCard from "./SearchCard";
import { Navigate } from "react-router-dom";

const SearchDiaryPage = () => {
  let searchKeyWord = useParams();
  const [diarys, setDiarys] = useState([]);
  const [render, setRender] = useState(false);
  let tmp = [];
  const [redirectArticle, setRedirectArticle] = useState(false);
  const [enterLink, setEnterLink] = useState(false);
  const cookieParser = new CookieParser(document.cookie);
  // console.log("render");
  // console.log(diarys);
  // const email = "allen3325940072@gmail.com";
  const email = cookieParser.getCookieByName("email");
  useEffect(() => {
    // console.log(diarys)
    // setRender(false);
    search();
  }, [searchKeyWord]);

  const passArticleLink = (enteredLink) => {
    setEnterLink(enteredLink);
    setRedirectArticle(true);
  };

  const search = () => {
    axios
      .get(
        `/search/${email}?condition=title&search_query=${searchKeyWord.keyWord}`,
        {
          headers: {
            Authorization: cookieParser.getCookieByName("token"),
          },
        }
      )
      .then((res) => {
        document.cookie = "token=" + res.data.token;
        console.log(res.data);
        if (res.data.diaryArray.length > 0) {
          res.data.diaryArray.forEach((element) => {
            console.log(element);
            if (element.length !== 0) {
              element.forEach((diary) => {
                console.log(diary);
                console.log(diary._id);
                console.log(diary.parentFolder);

                tmp.push(
                  // <SearchCard
                  //   key={diary._id}
                  //   inFolder={diary.parentFolder}
                  //   items={diary}
                  // />
                  <Card
                    key={diary._id}
                    items={diary}
                    selectedFolder={diary.parentFolder}
                    onPassArticleLink={passArticleLink}
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
