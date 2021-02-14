import React, { Component } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "../styles/registerPage.css";
const { backend_api } = require("../utils/backend_api");

const RegisterPage = () => {
  const history = useHistory();
  const { handleSubmit, errors } = useForm();

  const handleFormSubmit = () => {
    //Start validating our form
    const userData = extractData();
    //console.log(userData);

    //Now send a request to backend server and add record to database

    fetch(backend_api + "newuser/", {
      headers: { "Content-Type": "application/json" },
      method: "post",
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then(
        (response) => {
          if (response && response.userCreated) {
            //console.log("Account creation Successful!");
            history.push("/login");
          } else alert("User Name already in use");
        },
        (error) => {
          alert("An Error Occured");
        }
      );
  };
  const extractData = () => {
    const user_name = document.getElementById("user_name").value;
    const user_password = document.getElementById("user_password").value;
    const user_first_name = document.getElementById("user_first_name").value;
    const user_last_name = document.getElementById("user_last_name").value;
    const user_email = document.getElementById("user_email").value;

    return {
      user_name: user_name,
      user_password: user_password,
      user_first_name: user_first_name,
      user_last_name: user_last_name,
      user_email: user_email,
    };
  };
  return (
    <div className="mainContainer">
      <form onSubmit={handleSubmit(handleFormSubmit)} method="post">
        <h2>Sign Up</h2>
        <div className="form-group">
          <input
            type="text"
            id="user_name"
            className="form-control"
            placeholder="Username"
            minLength="4"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="user_password"
            className="form-control"
            placeholder="Password"
            minLength="4"
            required
          />
        </div>
        <div className="row mb-4">
          <div className="col">
            <div className="form-outline">
              <input
                type="text"
                id="user_first_name"
                className="form-control"
                placeholder="First name"
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <input
                type="text"
                id="user_last_name"
                className="form-control"
                placeholder="Last name"
                required
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <input
            type="email"
            id="user_email"
            className="form-control"
            placeholder="Email"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
