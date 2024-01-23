import { Component } from "react";
import { Colors } from "../styles/colors";
import { textStyle, h2Style } from "../styles/text";
import MyButton from "./myButton";

let jobSectionStyle = {
  backgroundColor: Colors.dark,
  verticalAlign: "middle",
  textAlign: "left",
  margin: "auto 10vmin",
};

let titleStyle = {
  ...h2Style,
  margin: "0 1vw 0 0 ",
};

const skillStyle = {
  color: Colors.light,
  backgroundColor: Colors.alernate,
  borderRadius: "100000px",
  borderColor: "#00000000",
  padding: "1vh",
  marginRight: "0.5vw",
  display: "inline-block",
  ...textStyle,
};

const Skill = (props) => <span style={skillStyle}>{props.children}</span>;

export default class JobSection extends Component {
  constructor(props) {
    super(props);

    this.title = props.title;
    this.skills = props.skills;
  }

  renderSkills() {
    return (
      <div style={{ padding: "1vh 0", display: "block" }}>
        {this.skills.map((e) => {
          return <Skill>{e}</Skill>;
        })}
      </div>
    );
  }

  render() {
    return (
      <div style={jobSectionStyle}>
        <span style={titleStyle}> {this.title}</span>
        {this.renderSkills()}
      </div>
    );
  }
}
