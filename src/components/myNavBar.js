import { Colors, Gradients } from "../styles/colors";

const navbarStyle = {
  backgroundImage: Gradients.DarkToTransparent,
  position: "fixed",
  height: "20vh",
  width: "100vw",
};

const MyNavbar = () => (
  <div id="navbar" style={navbarStyle}>
    <span>Example</span>
  </div>
);

export default MyNavbar;
