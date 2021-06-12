import axios from 'axios';
import React, { Component } from 'react';
import { connect } from "react-redux";

class App extends Component {
  createNewUser = () => {
    let url = "http://77.120.241.80:8811/api/users";
    let users_per_page = 5;
    let userlist_page = 1;
    
    let username = document.getElementById("username").value;
    let surname = document.getElementById("surname").value;
    let description = document.getElementById("description").value;
    document.querySelector(".form_control_wrap").classList.remove("error")

    let new_user = {};
    if(username === "" || surname === "" || description === "") {
      document.querySelector(".form_control_wrap").classList.add("error");
      return;
    } else {
      new_user = {
        name: username,
        surname: surname,
        desc: description,
      }
    }

    const updateUserList = () => {
      axios.get("http://77.120.241.80:8811/api/users")
        .then(res => {
          this.props.dispatch({ type: "UPDATE_USERLIST", payload: res.data.reverse() });
          this.props.dispatch({ type: "USERLIST_PAGINATION", payload: { 
            userlist_pagination: { 
              userlist_page, 
              users_per_page 
            } 
          }})
        })
    }

    //add new user to db through api
    axios.post(url, new_user)
      .then(res => {
        console.log("Created");
        updateUserList();
        this.props.history.push("/");
      })
  }

  checkState = () => {
    console.log(this.props.state);
    console.log(this.props.history);
  }

  render() {
    return (
      <div className="main_wrapper">
        <h2>Create New User</h2>
        <div className="user_form">
          <div className="form_control_wrap">
            <input id="username" className="form-control" type="text" autoComplete="off" placeholder="Name" aria-label="Name" />
            <input id="surname" className="form-control" type="text" autoComplete="off" placeholder="Surname" aria-label="Surname" />
            <input id="description" className="form-control" type="text" autoComplete="off" placeholder="Description" aria-label="Description" />
          </div>
          <button className="btn btn-primary create_new_user" onClick={this.createNewUser}>Create New User</button>
        </div>
        <br />
        <button className="btn btn-info" onClick={this.checkState}>Check State</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(App);