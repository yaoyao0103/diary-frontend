import Button from "@material-ui/core/Button";
import "./MDlogoFont.css";
import styled from "@emotion/styled";

function MDlogo() {
  // make logo button make scence
  const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    fontFamily: [
      'Gochi Hand'
    ],
    padding: theme.spacing(0),
    fontSize: 50
  }));

  return (
    <ColorButton
      size="small"
      variant="text"
      href="/"
    >
      <p className="logo">MyDiary</p>
    </ColorButton>
  );
}

export default MDlogo;
