import React, { useEffect, useState } from "react";
import axios from "../axios/axios";
import CookieParser from "../CookieParser/CookieParser";
import Card from "../Cards/Card";

export default function FavoritePage() {
    let cookieParser = new CookieParser(document.cookie);
    const [folder, setFolder] = useState([]);
    useEffect(() => {
        let tmp = [];
        let email = cookieParser.getCookieByName("email");
        axios.get(`isFavored/${email}`, {
            headers: {
                "Authorization": cookieParser.getCookieByName("token"),
            },
        })
            .then((res) => {
                console.log("in fetch Favorite");
                document.cookie = "token=" + res.data.token;
                console.log(res.data.diaryArray);
                setFolder(res.data.diaryArray);
                // setFolder(res.data.folder);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const passArticleLink = (enteredLink) => {
        setEnterLink(enteredLink);
        setRedirectArticle(true);
    };
    const passReRender = () => {
        // console.log("n");
    }
    const alertSuc = () => {

    }
    const alertFail = () => {
        
    }

    return (
        folder.length === 0 ? <h1>a</h1> : folder.map(diary => {
            <Card key={diary._id}
                items={diary}
                selectedFolder={diary.parentFolder}
                onPassArticleLink={passArticleLink}
                onPassReRender={passReRender}
                onAlertSuccess={alertSuc}
                onAlertFail={alertFail} />
        })
        // <h1>a</h1>
    )
}