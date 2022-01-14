import React, { useEffect, useState } from "react";
import axios from "../axios/axios";
import CookieParser from "../CookieParser/CookieParser";
import Card from "../Cards/Card";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

export default function FavoritePage() {
    let navigate = useNavigate();
    let cookieParser = new CookieParser(document.cookie);
    const [reRender, setReRender] = useState(false);
    const [tmp, setTmp] = useState([]);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openFail, setOpenFail] = React.useState(false);
    const [toastMsg, setToastMsg] = React.useState("");
    const [diarys, setDiarys] = React.useState([]);
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
                setDiarys(res.data.diaryArray);
                // res.data.diaryArray.map(diary => {
                //     console.log(diary)
                //     tmp.push(<Card
                //         key={diary._id}
                //         items={diary}
                //         selectedFolder={diary.parentFolder}
                //         onPassArticleLink={passArticleLink}
                //         onPassReRender={passReRender}
                //         onAlertSuccess={alertSuc}
                //         onAlertFail={alertFail} />);
                // })
                console.log("tmp is ")
                console.log(tmp)
                setTmp(tmp);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [reRender]);

    const passArticleLink = (enteredLink) => {
        navigate(enteredLink);
    };
    const passReRender = () => {
        console.log("changedd");
        setReRender(true);
    }
    const alertSuc = (msg) => {
        setToastMsg(msg);
        setOpenSuccess(true);
    }
    const alertFail = (msg) => {
        setToastMsg(msg);
        setOpenFail(true);
    }
    const handleCloseFail = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenFail(false);
    };

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
    };

    return (
        <div>
            {diarys.length > 0 ?
                diarys.map(
                    diary =>
                        <Card
                            key={diary._id}
                            items={diary}
                            selectedFolder={diary.parentFolder}
                            onPassArticleLink={passArticleLink}
                            onPassReRender={passReRender}
                            onAlertSuccess={alertSuc}
                            onAlertFail={alertFail}
                        />
                )
                :
                <p className="noDiary">No Favorite Diary Here</p>}
            {/* {tmp.length === 0 ? <h1>no Favorite Diary here</h1> : tmp} */}
            <Snackbar Snackbar open={openFail} autoHideDuration={2000} onClose={handleCloseFail} >
                <Alert onClose={handleCloseFail} severity="error" sx={{ width: '100%' }}>
                    {toastMsg}
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={2000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                    {toastMsg}
                </Alert>
            </Snackbar>
        </div>
    )
}