import React, { Component } from "react";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { user_name: this.props.user_name };
    //this.fetchUserData(this.props.user_name);
  }

  render() {
    return <h3>Hello {this.state.user_name}</h3>;
  }
  // fetchUserData = (user_name) => {
  //   fetch("http://localhost:3000/getUserData/" + user_name)
  //     .then((res) => res.json())
  //     .then(
  //       (res) => {
  //         if (res.isValid) {
  //           //Now create a token and store in LocalStorage, for future
  //           localStorage.setItem("user_auth_token", user_name);
  //           history.push("/home");
  //         } else alert("User not found");
  //       },
  //       (error) => {
  //         alert("Error occured");
  //       }
  //     );
  // };
}

export default HomePage;
