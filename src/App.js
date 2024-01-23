import MyButton from "./components/myButton";
import "./App.css";
import { Gradients } from "./styles/colors";
import MyNavbar from "./components/myNavBar";
import HomePage from "./pages/home";
import IntroductionPage from "./pages/introduction";
import { textStyle } from "./styles/text";
import lowSpecMode from "./core/lowSpecMode";

if (lowSpecMode)
  alert(
    `You are using a low spec broswer, this may cause poor performance. The website will start in low spec mode, please switch to using chrome or firefox for the full experience.`
  );

const appStyle = { ...textStyle };

function App() {
  //
  //<MyNavbar></MyNavbar>
  //<IntroductionPage />
  return (
    <div className="App" style={appStyle}>
      <script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.js"></script>
      <div backgroundImage={Gradients.DarkToTransparent}></div>
      <HomePage />
      <IntroductionPage />
    </div>
  );
}

export default App;
