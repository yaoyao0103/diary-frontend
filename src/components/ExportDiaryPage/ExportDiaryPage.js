import { React, useEffect, useState } from 'react';
import { JsonTable } from 'react-json-to-html';
import { useParams } from 'react-router-dom';
import { Fab } from "@mui/material";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import axios from '../axios/axios';

const ExportDiaryPage = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [diaryJson, setDiaryJson] = useState("");
    let path = useParams();

    // darkmode
    let localDarkMode = localStorage.getItem("darkMode");
    useEffect(() => {
        // setRedirect(false);
        if (localDarkMode === "true") {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }, [localDarkMode])

    useEffect(() => {
        fetchDiary();
    }, [])

    // fetch diary
    const fetchDiary = () => {
        axios.get(`shareLink/${path.path}`)
            .then(res => {
                setDiaryJson(res.data.diary);
            })
            .catch(e => {
                console.log(e);
            })
    }

    // css
    let buttonCss = {
        color: 'black',
        backgroundColor: '#ffb6c1',
        borderRadius: '5px',
    }
    let Css = {
        jsonTr: {
            height: '25px'
        },
        jsonTd: {
            padding: '5px',
            borderSpacing: '2px',
            borderRadius: '5px'
        },
        rowSpacer: {
            height: '2px'
        },
        rootElement: {
            padding: '5px',
            borderSpacing: '2px',
            backgroundColor: '#FAEBD7',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            borderRadius: '5px'
        },
        subElement: {
            padding: '5px',
            borderSpacing: '2px',
            backgroundColor: '#FAEBD7',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            borderRadius: '5px'
        },
        dataCell: {
            borderSpacing: '2px',
            backgroundColor: '#FAEBD7',
            fontFamily: 'Arial',
            borderRadius: '5px'
        }
    }
    if (darkMode === true) {
        Css = {
            jsonTr: {
                height: '25px'
            },
            jsonTd: {
                padding: '5px',
                borderSpacing: '2px',
                borderRadius: '5px',
            },
            rowSpacer: {
                height: '2px'
            },
            rootElement: {
                padding: '5px',
                borderSpacing: '2px',
                // backgroundColor: '#1B92D1',
                backgroundColor: '#0c1929',
                fontWeight: 'bold',
                fontFamily: 'Arial',
                borderRadius: '5px'
            },
            subElement: {
                padding: '5px',
                borderSpacing: '2px',
                backgroundColor: '#0c1929',
                fontWeight: 'bold',
                fontFamily: 'Arial',
                borderRadius: '5px',
            },
            dataCell: {
                borderSpacing: '2px',
                backgroundColor: '#0c1929',
                fontFamily: 'Arial',
                borderRadius: '5px'
            }
        };
        buttonCss = {
            color: 'white',
            backgroundColor: '#1B92D1',
            borderRadius: '5px',
        };
    }

    //  export JSOM
    function export2txt() {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(diaryJson, null, 2)], {
            type: "text/plain"
        }));
        a.setAttribute("download", "data.txt");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }


    if (diaryJson != "") {
        return (<div className='exportDiary'>
            <JsonTable css={Css} json={diaryJson} />
            {window.location.pathname === '/newDiary' ? "" : <Fab color="primary" sx={{
                position: 'sticky',
                bottom: 16,
                left: "95%"
            }}
                onClick={export2txt}
            >
                <SaveAltIcon />
            </Fab>}
        </div>)
    } else {
        return (
            <div style={{ width: "100vw", height: "100vh" }}>
                <p style={{ margin: '0', position: 'absolute', top: '50%', left: '50%' }}>no diary</p>
            </div>
        )
    }

}

export default ExportDiaryPage;