import React, { Component } from "react";
import "../styles/loginPage.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
const { backend_api } = require("../utils/backend_api");

const LoginPage = (props) => {
  const history = useHistory();
  const { handleSubmit, errors } = useForm();

  const AuthenticateUser = () => {
    const user_name = document.getElementById("user_name").value;
    const user_password = document.getElementById("user_password").value;

    //Store creds in JSON object
    const user_creds = { user_name: user_name, user_password: user_password };

    //Now make a call to the backend to validate user credentials
    fetch(backend_api + "authenticateUser/", {
      headers: { "Content-Type": "application/json" },
      method: "post",
      body: JSON.stringify(user_creds),
    })
      .then((res) => res.json())
      .then(
        (user_data) => {
          //Validate user credentials
          if (user_data) {
            if (
              user_data.user_password &&
              user_data.user_password === user_password
            ) {
              //Now create a token and store in LocalStorage, for future
              localStorage.setItem("user_auth_token", user_name);
              history.push("/home");
            } else {
              alert("UserName does not exist or Password is incorrect");
            }
          }
        },
        (error) => {
          alert("An Error Occured");
        }
      );
  };
  return (
    <div>
      <header id="headerWrapper">
        <div style={{ "text-align": "center" }}>
          <h2>Welcome to Cloud File Storage</h2>
          Access your files from multiple devices
        </div>
      </header>
      <div className="mainContainer">
        <form onSubmit={handleSubmit(AuthenticateUser)} method="post">
          <h2>Log in</h2>
          <div className="form-group">
            <input
              type="text"
              id="user_name"
              className="form-control"
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="user_password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              Sign in
            </button>
          </div>
          <div id="newUserRegistrationWrapper">
            <p className="text-center">Not a member yet? </p>
            <Link
              to="/register"
              id="registerButton"
              className="btn btn-success btn-block mb-4"
            >
              Create New Account
            </Link>
          </div>
        </form>
      </div>
      <footer id="footerWrapper" style={{ "text-align": "center" }}>
        <a href="/">
          <img src="universityLogo.png" alt="University of Cincinnati" />
        </a>
        <br />
        <br />
        <a href="/">
          <img
            src="powered-by-aws-logo.png"
            alt="Powered by AWS Cloud Computing"
          />
        </a>
      </footer>
    </div>
  );
};
export default LoginPage;
