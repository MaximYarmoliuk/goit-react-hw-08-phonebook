import React, { Component, createContext } from "react";

const Context = createContext();

export default class ThemeContext extends Component {
  static Consumer = Context.Consumer;

  componentDidMount() {
  
    const persistedTheme = localStorage.getItem("theme");
    if (persistedTheme) {
      this.setState({
        type: JSON.parse(persistedTheme)
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.type !== this.state.type) {
      localStorage.setItem("theme", JSON.stringify(this.state.type));
    }
  }

  toggleTheme = () => {
    this.setState({
      type: this.state.type === "dark" ? "light" : "dark",
    });
  };

  state = {
    type: "light",
    themeConfig: {
      light: {
        fontColor: "black",
        bodybg: "#e3f2fd",
      },
      dark: {
        fontColor: "white",
        bodybg: "#2962ff",
      },
    },
    toggleTheme: this.toggleTheme,
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
