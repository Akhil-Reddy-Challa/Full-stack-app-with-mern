import React, { Component } from "react";
import "../styles/homePage.css";
import "font-awesome/css/font-awesome.min.css";
import FileUploadForm from "./FileUploadForm";
const { backend_api } = require("../utils/backend_api");
let user_details = {};

class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    user_details: {
      user_name: this.props.user_name,
      user_first_name: "first_name",
      user_last_name: "last_name",
      user_email: "abc@abc.com",
    },
    userFiles: ["dummy.txt"],
  };
  OpenFileUploadForm = () => {
    document.getElementById("fileUploadFormWrapper").style.display = "block";
  };
  HandleFileUpload = (e) => {
    console.log("Handling file uoad...");

    e.preventDefault();
    let uploadedFile = document.getElementById("userUploadFile");
    uploadedFile = uploadedFile.files[0];
    //Check the file type and accept only text files
    if (uploadedFile.type !== "text/plain") {
      alert("You can only upload text files!");
      return;
    }
    //Now prepare the file for transfer
    const { user_name } = this.state.user_details;
    const file_data = new FormData();
    file_data.append("file", uploadedFile);
    file_data.append("user_name", user_name);

    fetch(backend_api + "fileupload/new", {
      method: "POST",
      body: file_data,
    })
      .then((res) => res.json())
      .then(
        (res) => {
          if (res.uploadSuccess) {
            this.PrintStatusOfUpload(1);
          } else this.PrintStatusOfUpload(0);
        },
        (error) => {
          this.PrintStatusOfUpload(2);
        }
      );
  };
  PrintStatusOfUpload = (statusCode) => {
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
  downloadFile = (fileName) => {
    console.log("Downloading " + fileName);

    var url = backend_api + "download/" + fileName;
    window.location = url;
  };
  render() {
    return (
      <div>
        <div className="userDetailsDisplayer">
          <p>Welcome {this.state.user_details.user_name}</p>
          <p>Email: {this.state.user_details.user_email}</p>
          <p>First name: {this.state.user_details.user_first_name}</p>
          <p>Last name: {this.state.user_details.user_last_name}</p>
        </div>
        <FileUploadForm onSubmit={this.HandleFileUpload} />
        <div className="tableWrapper">
          <div className="row">
            <div className="col-sm-6">
              <h2 className="titleOfApp">Files</h2>
            </div>
            <div className="col-sm-6">
              <button
                onClick={this.OpenFileUploadForm}
                type="button"
                className="btn btn-success"
                id="uploadFileButton"
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
                  <th>Word Count</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.userFiles.map((file_name, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{file_name[0]}</td>
                    <td>{file_name[1]}</td>
                    <td>
                      <div className="actionIconsWrapper">
                        <button
                          className="btn btn-light"
                          onClick={() => this.downloadFile(file_name[0])}
                        >
                          <i className="fa fa-arrow-down"></i>
                          Download
                        </button>
                        <button className="btn btn-danger">
                          <i className="fa fa-trash"></i> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    console.log("inside fetch");

    //First make our Footer,header banner disappear, we display logos on login,signup pages.
    document.getElementById("footerWrapper").style.display = "none";
    document.getElementById("headerWrapper").style.display = "none";

    //Get user name
    const { user_name } = this.state.user_details;
    //Now make a call to the backend to get user details
    fetch(backend_api + "getUserData/", {
      headers: { "Content-Type": "application/json" },
      method: "post",
      body: JSON.stringify({ user_name: user_name }),
    })
      .then((res) => res.json())
      .then(
        (user_data_packet) => {
          console.log(user_data_packet);
          if (user_data_packet) {
            // Push all the JSON values to a object
            //this.setState({ user_details: user_data_packet });
            user_details = user_data_packet;
            //Now make a call to the backend to get user file details
            fetch(backend_api + "files", {
              headers: { "Content-Type": "application/json" },
              method: "post",
              body: JSON.stringify({ user_name: user_name }),
            })
              .then((res) => res.json())
              .then(
                (user_files_packet) => {
                  //console.log(user_files);
                  //Remove the path from the string
                  console.log("packet", user_files_packet);
                  for (let i = 0; i < user_files_packet.length; i++) {
                    let packet = user_files_packet[i].split("/");
                    user_files_packet[i] = [packet[6], packet[7]];
                  }
                  console.log(user_files_packet);
                  this.setState({
                    user_details: user_details,
                    userFiles: user_files_packet,
                  });
                },
                (error) => {
                  alert("An Error Occured");
                }
              );
          }
        },
        (error) => {
          alert("An Error Occured");
        }
      );
  }
}

export default HomePage;
