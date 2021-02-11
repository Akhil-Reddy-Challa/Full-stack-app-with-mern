import React, { Component } from "react";
import "../styles/homePage.css";
import "font-awesome/css/font-awesome.min.css";
import FileUploadForm from "./FileUploadForm";

const HomePage = (props) => {
  const user_details = FetchUserData(props);

  return (
    <div>
      <div className="userDetailsDisplayer">
        <p>Welcome {user_details.user_name}</p>
        <p>Email: {user_details.user_email}</p>
        <p>First name: {user_details.first_name}</p>
        <p>Last name: {user_details.last_name}</p>
      </div>
      <FileUploadForm onSubmit={HandleFileUpload} />
      <div className="tableWrapper">
        <div className="row">
          <div className="col-sm-6">
            <h2 className="titleOfApp">Files</h2>
          </div>
          <div className="col-sm-6">
            <button
              onClick={OpenFileUploadForm}
              type="button"
              className="btn btn-success"
            >
              Upload a file
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
                    <button className="btn btn-light">
                      <i className="fa fa-arrow-down"></i>
                      Download
                    </button>
                    <button className="btn btn-danger">
                      <i className="fa fa-trash"></i> Delete
                    </button>
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

  return {
    user_name,
    first_name: "first_name",
    last_name: "last_name",
    user_email: "abc@abc.com",
  };
};
const OpenFileUploadForm = () => {
  document.getElementById("fileUploadFormWrapper").style.display = "block";
};
const HandleFileUpload = (e) => {
  e.preventDefault();
  let uploadedFile = document.getElementById("userUploadFile");
  uploadedFile = uploadedFile.files[0];
  //Check the file type and accept only text files
  if (uploadedFile.type !== "text/plain") {
    alert("You can only upload text files!");
    return;
  }
  //Now prepare the file for transfer
  const file_data = new FormData();
  file_data.append("file", uploadedFile);

  fetch("http://localhost:3000/fileupload/new", {
    method: "POST",
    body: file_data,
  })
    .then((res) => res.json())
    .then(
      (res) => {
        if (res.uploadSuccess) {
          PrintStatusOfUpload(1);
        } else PrintStatusOfUpload(0);
      },
      (error) => {
        PrintStatusOfUpload(2);
      }
    );
};
const PrintStatusOfUpload = (statusCode) => {
  let htmlID = "fileUpload";
  if (statusCode === 1) {
    htmlID += "Success";
  } else {
    //Something went wrong during file upload
    htmlID += "Failed";
  }
  //Now get the <i> Tag and display the message
  document.getElementById(htmlID).style.display = "block";

  //Now set a timeout for 3 seconds

  setTimeout(() => {
    //Clear the form data
    document.getElementById("uploadForm").reset();
    //Clear the file upload status message, for future uploads
    document.getElementById(htmlID).style.display = "none";
    //Hide the upload form
    document.getElementById("fileUploadFormWrapper").style.display = "none";
  }, 3000);
};

export default HomePage;
