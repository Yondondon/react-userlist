import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";

class App extends Component {
  updateUser = () => {
    let url = `http://77.120.241.80:8811/api/user/${this.props.state.user_to_edit.id}`;

    let username = document.getElementById("username").value;
    let surname = document.getElementById("surname").value;
    let description = document.getElementById("description").value;
    let user = {
      name: username,
      surname: surname,
      desc: description,
    }

    //update user through api
    axios.put(url, user)
      .then(res => {
        console.log("Updated");
        updateUserList();
        this.props.dispatch({ type: "USER_TO_EDIT", payload: { user_to_edit: {} } });
        this.props.history.push("/");
      })


    const updateUserList = () => {
      axios.get("http://77.120.241.80:8811/api/users")
        .then(res => {
          let temp_arr = res.data.reverse();
          this.props.dispatch({ type: "UPDATE_USERLIST", payload: temp_arr });
        })
    }
  }


  checkState = () => {
    console.log(this.props.state);
  }

  
  render() {
    let user = {};
    if(this.props.state.user_to_edit) {
      user.name = this.props.state.user_to_edit.name
      user.surname = this.props.state.user_to_edit.surname
      user.desc = this.props.state.user_to_edit.desc  
    } else {
      user.name = "Name"
      user.surname = "Surname"
      user.desc = "Desc"
    }
    

    return (
      <div className="main_wrapper">
        <h2>Edit User</h2>
        <div className="user_form">
          <input id="username" className="form-control" type="text" autoComplete="off" defaultValue={user.name} placeholder="Name" aria-label="Name"></input>
          <input id="surname" className="form-control" type="text" autoComplete="off" defaultValue={user.surname} placeholder="Surname" aria-label="Surname"></input>
          <input id="description" className="form-control" type="text" autoComplete="off" defaultValue={user.desc} placeholder="Description" aria-label="Description"></input>
          <button className="btn btn-primary create_new_user" onClick={this.updateUser}>Update user</button>
        </div>
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