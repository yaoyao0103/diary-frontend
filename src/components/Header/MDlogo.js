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
    fontSize: 50
    
  }));

  return (
    <ColorButton
      size="small"
      variant="text"
      onClick={() => {
        console.log("index");
      }}
      // LinkComponent={<Link component={Home} />
      href="/"
    >
      <p className="logo">MyDiary</p>
    </ColorButton>
  );
}

export default MDlogo;
