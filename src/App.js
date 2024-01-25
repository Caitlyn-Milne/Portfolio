import "./App.css";
import { Gradients } from "./styles/colors";
import HomePage from "./pages/home";
import ExperiencePage from "./pages/experience";
import { textStyle } from "./styles/text";
import lowSpecMode from "./core/lowSpecMode";
import React, { Component } from "react";
import MathUtil from "./core/mathUtil";

if (lowSpecMode)
  alert(
    `You are using a low spec broswer, this may cause poor performance. The website will start in low spec mode, please switch to using chrome or firefox for the full experience.`
  );

const appStyle = { ...textStyle, marginTop: 0, paddingTop: 0 };

export default class App extends Component {
  changeFavicon(src) {
    var link = document.createElement("link"),
      oldLink = document.getElementById("dynamic-favicon");
    link.id = "dynamic-favicon";
    link.rel = "shortcut icon";
    link.href = src;
    if (oldLink) {
      console.log(oldLink);
      document.head.removeChild(oldLink);
    }
    document.head.appendChild(link);
  }

  componentDidMount() {
    document.title = "Caitlyn Milne";

    var iconIndex = MathUtil.randomInt(1, 6);
    this.changeFavicon("/images/fav" + iconIndex + ".ico");
  }
  render() {
    return (
      <div className="App" style={appStyle}>
        <script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.js"></script>
        <div backgroundImage={Gradients.DarkToTransparent}></div>
        <HomePage />
        <ExperiencePage />
        <div
          style={{
            position: "Fixed",
            top: "1vh",
            right: "1vw",
            padding: 8,
          }}
        >
          Work In Progress - Watch this space
        </div>
      </div>
    );
  }
}
