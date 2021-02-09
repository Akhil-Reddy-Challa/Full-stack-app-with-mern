import React, { Component } from "react";
import "../styles/loginPage.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const AuthenticateUser = () => {
    //console.log("Authenticating");
    const user_name = document.getElementById("user_name").value;
    const user_password = document.getElementById("user_password").value;
    //console.log(user_name, user_password);

    //Now make a call to the backend to validate user credentials
    const user_data = user_name + "&&" + user_password;
    fetch("http://localhost:3000/authenticateUser/" + user_data)
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
    <div className="mainContainer">
      <h3 id="loginPageTitle">Log In</h3>
      <form onSubmit={handleSubmit(AuthenticateUser)} method="POST">
        <div className="form-outline mb-4" id="user_name_box">
          <input
            type="text"
            id="user_name"
            className="form-control"
            placeholder="User name"
            required
          />
        </div>

        <div className="form-outline mb-4" id="user_password_box">
          <input
            type="password"
            id="user_password"
            className="form-control"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>
        <p>Not a member? </p>
        <Link
          to="/register"
          id="registerButton"
          className="btn btn-success btn-block mb-4"
        >
          Register
        </Link>
      </form>
    </div>
  );
};
export default LoginPage;
