import MyButton from "../components/myButton";

import backgroundSrc from "../images/home_background.png";
import { h1Style, h2Style } from "../styles/text";
import MySketch from "../sketches/boidsSketch";

let pageStyle = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  pointerEvents: "none",
};

const backgroundStyle = {
  backgroundImage: `url(${backgroundSrc})`,
  backgroundSize: "cover",
  backgroundPositionX: "center",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: "-2",
  position: "absolute",
  filter: "brightness(80%)",
};

const contentDivStyle = {
  pointerEvents: "auto",
  margin: "10vmin",
  textAlign: "left",
  width: "100vw",
};

const HomePage = () => {
  return (
    <div id="home" style={pageStyle}>
      <div style={contentDivStyle}>
        <div style={backgroundStyle}>
          <MySketch></MySketch>
        </div>
        <span style={h1Style}>Caitlyn Milne</span> <br />
        <span style={h2Style}>Software Engineer</span> <br />
        <MyButton disabled={true}>Contact ➤</MyButton>
        <MyButton>Blog ➤</MyButton>
      </div>
    </div>
  );
};

export default HomePage;
