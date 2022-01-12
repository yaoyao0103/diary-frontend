import { Button, ButtonGroup } from "@material-ui/core";
import styled from "@emotion/styled";


const MyThemeComponent = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(4),
    // borderRadius: theme.shape.borderRadius,
    borderBlockColor:theme.palette.primary.main,
    borderColor:theme.palette.primary.main,
    // fontSize:'0.00001rem',
}));

const SmallHeader = () => {
    return (
        <div>
            <ButtonGroup className="ButtonGroup" variant="text">
                <MyThemeComponent href="/newDiary"><p className="smallButton">new diary</p></MyThemeComponent>
                <MyThemeComponent href="/calenderSearch"><p className="smallButton">calender</p></MyThemeComponent>
                {/* <MyThemeComponent href="/folderPage"><p className="smallButton">folder</p></MyThemeComponent> */}
                {/* <MyThemeComponent href="/test"><p className="smallButton">test</p></MyThemeComponent> */}
                {/* <MyThemeComponent href="/">outline page</MyThemeComponent> */}
            </ButtonGroup>
        </div>
    )
}

export default SmallHeader;