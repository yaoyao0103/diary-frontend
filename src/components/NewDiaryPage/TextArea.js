import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const TextArea = (props) => {
    const [content, setContent] = React.useState('');
    const [fisrtTime, setFirstTime] = React.useState(true);
    const handleContentChange = (event) => {
        props.onChangeContent(event.target.value);
        setContent(event.target.value);
    }

    React.useEffect(() => { 
        if(props.content && fisrtTime) {
            setContent(props.content);
            setFirstTime(false);
        }
    }, [props.content]);

    return (
        <TextareaAutosize
            minRows={23}
            maxRows={23}
            placeholder="請輸入日記"
            value={content}
            id = "diary_content"
            style={{ width: "100%",backgroundColor:"#FFF0D4"}}
            onChange={handleContentChange}
        />
    )
}

export default TextArea;