import React, { Component } from "react";
import "../styles/registerPage.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const RegisterPage = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const handleFormSubmit = () => {
    //Start validating our form
    const {
      user_name,
      user_password,
      user_first_name,
      user_last_name,
      user_email,
    } = extractData();

    if (!userAccountExists(user_name)) {
      //Now send a request to backend server and add record to database
      const user_data =
        user_name +
        "&&" +
        user_password +
        "&&" +
        user_first_name +
        "&&" +
        user_last_name +
        "&&" +
        user_email;
      fetch("http://localhost:3000/newuser/" + user_data)
        .then((res) => res.json())
        .then(
          (res) => {
            if (res && res.insertedToDB) {
              //Insertion success
              console.log("Success");
              history.push("/login");
            } else alert("Error occured");
          },
          (error) => {
            alert("Error occured");
          }
        );
    }
  };
  const extractData = () => {
    const user_name = document.getElementById("user_name").value;
    const user_password = document.getElementById("user_password").value;
    const user_first_name = document.getElementById("user_first_name").value;
    const user_last_name = document.getElementById("user_last_name").value;
    const user_email = document.getElementById("user_email").value;

    return {
      user_name,
      user_password,
      user_first_name,
      user_last_name,
      user_email,
    };
  };
  const userAccountExists = (user) => {
    //Make a request to DB to find if user_account exists
    fetch("http://localhost:3000/validateUser/" + user)
      .then((res) => res.json())
      .then(
        (res) => {
          if (res.isValid) {
            //User already exists
            return true;
          } else return false;
        },
        (error) => {
          alert("Error occured");
          return false;
        }
      );
  };
  return (
    <div className="mainContainer">
      <h3 id="registerPageTitle">Sign Up</h3>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="form-outline mb-4">
          <input
            type="text"
            id="user_name"
            className="form-control"
            placeholder="User name"
            minLength="4"
            required
          />
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="user_password"
            className="form-control"
            placeholder="Password"
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
        <div className="row mb-4">
          <div className="col">
            <div className="form-outline">
              <input
                type="email"
                id="user_email"
                className="form-control"
                placeholder="Email"
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;