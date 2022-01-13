import { Button, Box, Fab } from "@material-ui/core";
import styled from "@emotion/styled";
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';

const UploadButton = (props) => {
    const Input = styled('input')({
        display: 'none',
    });

    const upload = () => {
        const inputElement = document.getElementById("contained-button-file");
        // console.log(inputElement.files[0]);
        props.onUploadFile(inputElement.files[0]);
    }


    // const [loading, setLoading] = useState(false);
    // const [success, setSuccess] = useState(false);
  
    const buttonSx = {
      ...(props.success && {
        bgcolor: green[500],
        '&:hover': {
          bgcolor: green[700],
        },
      }),
    };
  


    return (
        <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" type="file" onChange={upload} />
            {/* <Box sx={{ m: 1, position: 'relative' }}>
            <Button
                variant="contained"
                component="span"
                sx={buttonSx}
                disabled={props.loading}
                >
                上傳圖片
            </Button>
            {props.loading && (
                <CircularProgress
                    size={24}
                    sx={{
                    color: green[500],
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                    }}
                />
            )}
            </Box> */}
            <Box sx={{ m: 1, position: 'relative' }} >
                <Fab
                    variant="contained"
                    component="span"
                    aria-label="save"
                    color="primary"
                    sx={buttonSx}
                    >
                    {props.success ? <CheckIcon /> : <AddPhotoAlternateIcon />}
                    </Fab>
                    {props.loading && (
                    <CircularProgress
                        size={68}
                        sx={{
                        color: green[500],
                        position: 'absolute',
                        top: -6,
                        left: -6,
                        zIndex: 1, 
                        }}
                    />
            )}
        </Box>
        </label>
    )
}

export default UploadButton;