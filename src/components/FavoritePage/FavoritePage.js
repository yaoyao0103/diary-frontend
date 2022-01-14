import React, { useEffect, useState } from "react";
import axios from "../axios/axios";
import CookieParser from "../CookieParser/CookieParser";
import Card from "../Cards/Card";
import { useNavigate } from "react-router-dom";

export default function FavoritePage() {
    let navigate = useNavigate();
    let cookieParser = new CookieParser(document.cookie);
    const [reRender, setReRender] = useState(false);
    const [tmp, setTmp] = useState([]);
    useEffect(() => {
        console.log("render in FavPage")
        setReRender(false);
        setTmp([]);
        let email = cookieParser.getCookieByName("email");
        axios.get(`isFavored/${email}`, {
            headers: {
                "Authorization": cookieParser.getCookieByName("token"),
            },
        })
            .then((res) => {
                console.log("in fetch Favorite");
                document.cookie = "token=" + res.data.token;
                // console.log(res.data.diaryArray);
                // setFolder(res.data.diaryArray);
                res.data.diaryArray.map(diary => {
                    console.log(diary)
                    tmp.push(<Card
                        key={diary._id}
                        items={diary}
                        selectedFolder={diary.parentFolder}
                        onPassArticleLink={passArticleLink}
                        onPassReRender={passReRender}
                        onAlertSuccess={alertSuc}
                        onAlertFail={alertFail} />);
                })
                console.log("tmp is ")
                console.log(tmp)
                setTmp(tmp);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [reRender])

    const passArticleLink = (enteredLink) => {
        navigate(enteredLink);
    };
    const passReRender = () => {
        console.log("changedd");
        setReRender(true);
    }
    const alertSuc = (msg) => {
        // setToastMsg(msg);
        // setOpenSuccess(true);
    }
    const alertFail = (msg) => {
        // setToastMsg(msg);
        // setOpenFail(true);
    }

    return (
        <div>
            {tmp.length === 0 ? <h1>no Favorite Diary here</h1> : tmp}
            {/* <Snackbar Snackbar open={openFail} autoHideDuration={2000} onClose={handleCloseFail} >
                <Alert onClose={handleCloseFail} severity="error" sx={{ width: '100%' }}>
                    {toastMsg}
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={2000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                    {toastMsg}
                </Alert>
            </Snackbar> */}
        </div>
        // folder.map(diary => {
        //     console.log(tmp);
        //     // console.log(diary._id);
        //     // console.log(diary);
        //     <Card
        //         key={diary._id}
        //         items={diary}
        //         selectedFolder={diary.parentFolder}
        //         onPassArticleLink={passArticleLink}
        //         onPassReRender={passReRender}
        //         onAlertSuccess={alertSuc}
        //         onAlertFail={alertFail} />
        // })
        // <h1>a</h1>
    )
}