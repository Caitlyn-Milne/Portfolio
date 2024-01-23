import MyButton from "./components/myButton";
import "./App.css";
import { Gradients } from "./styles/colors";
import MyNavbar from "./components/myNavBar";
import HomePage from "./pages/home";
import IntroductionPage from "./pages/introduction";
import ExperiencePage from "./pages/experience";
import { textStyle } from "./styles/text";
import lowSpecMode from "./core/lowSpecMode";
import { Colors } from "./styles/colors";

if (lowSpecMode)
  alert(
    `You are using a low spec broswer, this may cause poor performance. The website will start in low spec mode, please switch to using chrome or firefox for the full experience.`
  );

const appStyle = { ...textStyle, marginTop: 0, paddingTop: 0 };

function App() {
  //
  //<MyNavbar></MyNavbar>
  //<IntroductionPage />
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

export default App;
