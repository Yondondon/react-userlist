import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios';

import Userlist from "./Userlist/App";

class Main extends Component {
  loadUsers = () => {
    let url = "http://77.120.241.80:8811/api/users";
    let users_per_page = 5;
    let userlist_page = 1;

    //get userlist from api
    axios.get(url)
      .then(res => {
        let temp_arr = res.data.reverse();
        this.props.dispatch({ type: "UPDATE_USERLIST", payload: temp_arr });
        this.props.dispatch({ type: "USERLIST_PAGINATION", payload: { 
          userlist_pagination: { 
            userlist_page, 
            users_per_page 
          } 
        }})
      })
  }

  checkState = () => {
    console.log(this.props);
  }

  render() {
    return (
      <div className="main_wrapper">
        <h2>Userlist</h2>
        <Userlist 
          users_per_page={
            this.props.state.userlist_pagination !== undefined ? 
            this.props.state.userlist_pagination.users_per_page : null
          }
          userlist_page={
            this.props.state.userlist_pagination !== undefined ? 
            this.props.state.userlist_pagination.userlist_page : null
          }
        />
        <div className="userlist_controls">
          <button className="btn btn-primary" onClick={this.loadUsers}>Load Users</button>
          <Link to={'/new_user'} className="btn btn-success">Create New User</Link>
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

export default connect(mapStateToProps)(Main);