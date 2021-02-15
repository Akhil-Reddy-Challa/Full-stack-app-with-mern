import { useEffect, useState } from "react";
import FileUploadForm from "./FileUploadForm";
import "../styles/homePage.css";
import "font-awesome/css/font-awesome.min.css";
import { useHistory } from "react-router-dom";
const { backend_api } = require("../utils/backend_api");

const HomePage = (props) => {
  const history = useHistory();
  let [userDetails, setUserDetail] = useState({ user_name: "User" });
  let [userFilesList, setUserFilesList] = useState([]);
  let [wordCount, setWordCount] = useState([]);
  useEffect(async () => {
    console.log("Inside use effect");
    //Make our Footer,header banner disappear, we display logos on login,signup pages.
    document.getElementById("footerWrapper").style.display = "none";
    document.getElementById("headerWrapper").style.display = "none";

    async function fetchUserInfo(user_name) {
      const response = await fetch(backend_api + "getUserData/", {
        headers: { "Content-Type": "application/json" },
        method: "post",
        body: JSON.stringify({ user_name }),
      });
      if (response.status == 200) {
        const fetchedData = await response.json(response);
        setUserDetail(fetchedData);
      } else {
        alert("An Error Occured!");
      }
    }
    async function fetchFiles(user_name) {
      const response = await fetch(backend_api + "files/", {
        headers: { "Content-Type": "application/json" },
        method: "post",
        body: JSON.stringify({ user_name }),
      });
      if (response.status) {
        let fetchedData = await response.json(response);
        //Process the data
        const user_files = [],
          word_count = [];
        for (let file of fetchedData) {
          file = file.split("/");
          user_files.push(file[6]); //File_name is stored at index 6
          word_count.push(file[7]);
        }
        setUserFilesList(user_files);
        setWordCount(word_count);
      } else {
        alert("An Error Occured!");
      }
    }
    // fetchUserInfo(props.user_name);
    // fetchFiles(props.user_name);
  }, [setUserFilesList]);
  const logOutUser = () => {
    //console.log("Loggin out....", userDetails.user_name);
    localStorage.removeItem("user_auth_token");
    history.push("/login");
  };
  const HandleFileUpload = async (e) => {
    e.preventDefault(); //Prevents page reload

    let uploadedFile = document.getElementById("userUploadFile");
    uploadedFile = uploadedFile.files[0];
    const file_name = uploadedFile.name;
    //Check the file type and accept only text files
    if (uploadedFile.type !== "text/plain") {
      alert("You can only upload text files!");
      return;
    }
    //Now prepare the file for transfer
    const { user_name } = userDetails;
    const file_data = new FormData();
    file_data.append("file", uploadedFile);
    file_data.append("user_name", user_name);
    console.log(uploadedFile);

    const response = await fetch(backend_api + "fileupload/new", {
      method: "POST",
      body: file_data,
    });
    if (response.status == 200) {
      const statusOfUpload = await response.json();
      console.log(statusOfUpload);
      if (statusOfUpload.uploadSuccess) {
        PrintStatusOfUpload(0);
        //Update the state to display the newly uploaded file
        setUserFilesList((userFilesList) => [...userFilesList, file_name]);
        setWordCount((wordCount) => [...wordCount, 999]);
      } else PrintStatusOfUpload(1);
    }
  };
  const PrintStatusOfUpload = (statusCode) => {
    let htmlID = "fileUpload";
    if (statusCode === 0) {
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
  const DownloadFile = (fileName) => {
    console.log("Downloading " + fileName);
    var url = backend_api + "download/" + fileName;
    window.location = url;
  };
  const OpenFileUploadForm = () => {
    document.getElementById("fileUploadFormWrapper").style.display = "block";
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          Hello {userDetails.user_name}
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link disabled" href="#">
                First Name: {userDetails.user_first_name}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">
                Last Name: {userDetails.user_last_name}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">
                Email: {userDetails.user_email}
              </a>
            </li>
          </ul>
          <button type="button" className="btn btn-info" onClick={logOutUser}>
            Log Out!
          </button>
        </div>
      </nav>
      <FileUploadForm onSubmit={HandleFileUpload} />
      <div className="tableWrapper">
        <div className="row">
          <div className="col-sm-6">
            <h4 className="titleOfApp">Files</h4>
          </div>
          <div className="col-sm-6">
            <button
              onClick={OpenFileUploadForm}
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
              {userFilesList.map((file_name, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{file_name}</td>
                  <td>{wordCount[index]}</td>
                  <td>
                    <div className="actionIconsWrapper">
                      <button
                        className="btn btn-light"
                        onClick={() => DownloadFile(file_name)}
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
};
export default HomePage;
