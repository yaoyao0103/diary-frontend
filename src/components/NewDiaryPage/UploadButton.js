import { Button } from "@material-ui/core";
import styled from "@emotion/styled";

const UploadButton = (props) => {
    const Input = styled('input')({
        display: 'none',
    });

    const upload = () => {
        const inputElement = document.getElementById("contained-button-file");
        // console.log(inputElement.files[0]);
        props.onUploadFile(inputElement.files[0]);
    }

    return (
        <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={upload} />
            <Button size="medium" variant="contained" component="span">
                上傳圖片
            </Button>
        </label>
    )
}

export default UploadButton;