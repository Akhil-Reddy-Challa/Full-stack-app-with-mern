import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import RegisterPage from "./components/RegisterPage";

class App extends Component {
  checkForToken = (Component) => () => {
    const user_auth_token = localStorage.getItem("user_auth_token");
    return user_auth_token ? (
      <Component user_name={user_auth_token} />
    ) : (
      <Redirect to="/login" />
    );
  };
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/home" render={this.checkForToken(HomePage)}></Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          {/* <Route path="*">
            <NotFound />
          </Route> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
