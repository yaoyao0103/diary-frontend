import Card from "./Card"
import React, { useEffect, useState } from "react";
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';

const Cards = (props) => {
    let len = props.items.length;
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openFail, setOpenFail] = React.useState(false);
    const [toastMsg, setToastMsg] = React.useState("");
    const passArticleLink = (enteredLink) => {
        props.onPassArticleLink(enteredLink);
    }
    const passReRender = (enteredBool) => {
        props.onPassReRender(enteredBool);
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
        <>
            {props.items.length > 0 ?
                props.items.map((item, index) => { return <Card key={index} items={item} selectedFolder={props.selectedFolder} onPassReRender={passReRender} onPassArticleLink={passArticleLink} onAlertSuccess={alertSuc} onAlertFail={alertFail} /> })
                : <p className="noDiary">No diary</p>
            }
            <Snackbar open={openFail} autoHideDuration={2000} onClose={handleCloseFail}>
                <Alert onClose={handleCloseFail} severity="error" sx={{ width: '100%' }}>
                    {toastMsg}
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={2000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                    {toastMsg}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Cards;