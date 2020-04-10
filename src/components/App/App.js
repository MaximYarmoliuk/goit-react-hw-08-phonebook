import React, { Component, Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import withTheme from "../../hoc/withTheme";
import { authOperations } from "../../redux/auth";
import Layout from "../Layout/Layout";
import routes from "../../routes";
import PublicRoute from "../PublicRoute/PublicRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Loader from "react-loader-spinner";

class App extends Component {
  componentDidMount() {
    this.props.onGetCurrentUser();
  }

  render() {
    const { themeConfig, type } = this.props.theme;

    return (
      <div
        style={{
          color: themeConfig[type].fontColor,
          background: themeConfig[type].bodybg,
          height: "100vh",
        }}
      >
        <BrowserRouter>
          <CssBaseline />
          <Layout>
            <Suspense
              fallback={
                <Loader
                  type="Oval"
                  color="#00BFFF"
                  height={50}
                  width={50}
                  style={{ position: "absolute", left: "50%", top: "90px" }}
                />
              }
            >
              <Switch>
                {routes.map((route) =>
                  route.private ? (
                    <PrivateRoute key={route.label} {...route} />
                  ) : (
                    <PublicRoute key={route.label} {...route} />
                  )
                )}
              </Switch>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = {
  onGetCurrentUser: authOperations.getCurrentUser,
};

export default withTheme(connect(null, mapDispatchToProps)(App));
