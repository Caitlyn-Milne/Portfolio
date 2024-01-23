import React, { Component } from "react";
import { Colors } from "../styles/colors";
import { textStyle } from "../styles/text";

const defaultStyle = {
  color: Colors.light,
  backgroundColor: Colors.primary,
  borderRadius: "100000px",
  borderColor: "#00000000",
  padding: "2vh",
  fontWeight: "bold",
  marginRight: "1vw",
  ...textStyle,
};

const defaultDisabledStyle = {
  ...defaultStyle,
  backgroundColor: Colors.disabled,
};

const defaultHoverStyle = {
  ...defaultStyle,
  backgroundColor: Colors.alernate,
};

class MyButton extends Component {
  constructor(props) {
    super(props);

    this.style = props.style ? props.style : defaultStyle;

    this.hoverStyle = props.hoverStyle ? props.hoverStyle : defaultHoverStyle;

    this.disabledStyle = props.disabledStyle
      ? props.disabledStyle
      : defaultDisabledStyle;

    this.state = {
      content: props.children,
      hover: false,
      disabled: props.disabled,
    };
  }

  setHover(to) {
    this.setState(() => {
      return {
        hover: to,
      };
    });
  }

  getStyle() {
    if (this.state.disabled) return this.disabledStyle;
    else return this.state.hover ? this.hoverStyle : this.style;
  }

  render() {
    return (
      <button
        style={this.getStyle()}
        onMouseOver={() => this.setHover(true)}
        onMouseLeave={() => this.setHover(false)}
        disabled={this.state.disabled}
      >
        {this.state.content}
      </button>
    );
  }
}

export default MyButton;
