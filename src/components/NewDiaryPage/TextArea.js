import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const TextArea = (props) => {
    const [content, setContent] = React.useState('');
    const [fisrtTime, setFirstTime] = React.useState(true);
    const handleContentChange = (event) => {
        // console.log("value is " + event.target.value);
        props.onChangeContent(event.target.value);
        setContent(event.target.value);
    }

    React.useEffect(() => { 
        if(props.content && fisrtTime) {
            setContent(props.content);
            setFirstTime(false);
            // console.log("in Cont"+props.content);
        }
    }, [props.content]);

    return (
        <TextareaAutosize
            minRows={23}
            maxRows={23}
            placeholder="請輸入日記"
            value={content}
            style={{ width: "100%",backgroundColor:"#FFF0D4"}}
            onChange={handleContentChange}
        />
    )
}

export default TextArea;