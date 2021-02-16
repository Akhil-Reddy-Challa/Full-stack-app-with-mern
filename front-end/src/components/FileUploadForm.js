import React, { Component } from "react";
const FileUploadForm = (props) => {
  return (
    <div id="fileUploadFormWrapper" className="fileUploadFormWrapper">
      <div className="fileUploadForm">
        <button
          id="formCloseButton"
          className="formCloseButton"
          data-dismiss="modal"
          aria-hidden="true"
          onClick={HandleFormClose}
        >
          X
        </button>
        <p>
          You can only<b> upload a text file</b> on the cloud
        </p>
        <form
          onSubmit={props.onSubmit}
          encType="multipart/form-data"
          id="uploadForm"
        >
          <div className="form-group">
            <input id="userUploadFile" type="file" required />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Upload
            </button>
          </div>
          <div className="fileUploadStatusDisplay">
            <i
              id="fileUploadSuccess"
              className="fa fa-check-circle"
              style={{ color: "green", fontSize: "20px", display: "none" }}
            >
              File Uploaded successfully!
            </i>
            <i
              id="fileUploadFailed"
              className="fa fa-check-circle"
              style={{ color: "red", fontSize: "20px", display: "none" }}
            >
              There was an error when trying to upload your file, try again!
            </i>
          </div>
        </form>
      </div>
    </div>
  );
};
const HandleFormClose = () => {
  document.getElementById("fileUploadFormWrapper").style.display = "none";
};
export default FileUploadForm;
