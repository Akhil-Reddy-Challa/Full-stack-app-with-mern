import React, { Component } from "react";
import "../styles/loginPage.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const backend_api =
    "http://ec2-3-12-85-236.us-east-2.compute.amazonaws.com:3000/";

  const AuthenticateUser = () => {
    //console.log("Authenticating");
    const user_name = document.getElementById("user_name").value;
    const user_password = document.getElementById("user_password").value;
    //console.log(user_name, user_password);

    //Now make a call to the backend to validate user credentials
    const user_data = user_name + "&&" + user_password;
    fetch(backend_api + "authenticateUser/" + user_data)
      .then((res) => res.json())
      .then(
        (res) => {
          if (res.isValid) {
            //Now create a token and store in LocalStorage, for future
            localStorage.setItem("user_auth_token", user_name);
            history.push("/home");
          } else alert("User not found");
        },
        (error) => {
          alert("Error occured");
        }
      );
  };
  return (
    <div class="mainContainer">
      <form onSubmit={handleSubmit(AuthenticateUser)} method="post">
        <h2>Log in</h2>
        <div class="form-group">
          <input
            type="text"
            id="user_name"
            class="form-control"
            placeholder="Username"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            id="user_password"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">
            Sign in
          </button>
        </div>
        <div id="newUserRegistrationWrapper">
          <p class="text-center">Not a member Yet? </p>
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
  );
};
export default LoginPage;
