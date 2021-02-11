import React, { Component } from "react";
import "../styles/homePage.css";
const HomePage = (props) => {
  const user_name = FetchUserData(props);
  console.log(user_name);

  return (
    <div>
      <div>
        <p>Hi {user_name} your details are as follows</p>
      </div>
      <div className="tableWrapper">
        <div className="row">
          <div className="col-sm-6">
            <h2 className="titleOfApp">Files</h2>
          </div>
          <div className="col-sm-6">
            <button type="button" className="btn btn-success">
              Upload new file
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>File Name</th>
                <th>Upload Date</th>
                <th>Word Count</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Anna</td>
                <td>Pitt</td>
                <td>35</td>
                <td>
                  <div className="actionIconsWrapper">
                    <span className="material-icons">download_for_offline</span>
                    <span className="material-icons" style={{ color: "red" }}>
                      delete
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
const FetchUserData = (props) => {
  //First make our Footer,header banner disappear, we display logos on login,signup pages.
  document.getElementById("footerWrapper").style.display = "none";
  document.getElementById("headerWrapper").style.display = "none";
  const user_name = props.user_name;
  const backend_api =
    "http://ec2-3-12-85-236.us-east-2.compute.amazonaws.com:3000/";
  return user_name;
};
export default HomePage;
