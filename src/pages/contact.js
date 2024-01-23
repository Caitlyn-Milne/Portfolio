import { Colors, Gradients } from "../styles/colors";

let introductionPageStyle = {
  backgroundColor: Colors.dark,
  height: "100vh",
  width: "100vw",
  backgroundSize: "cover",
  textAlign: "center",
};

const IntroductionPage = () => (
  <div id="introduction" style={introductionPageStyle}>
    IntroductionPage
  </div>
);

export default IntroductionPage;
