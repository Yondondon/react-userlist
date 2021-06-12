import axios from "axios";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//components
import UserPagination from "./UserPagination";

class App extends Component {
  handleEditUserBtn = (e) => {
    const { history } = this.props;

    let user_id = e.currentTarget.closest(".userlist_item").getAttribute("data-user-id");
    let user_to_edit = this.props.state.userlist.filter(el =>  el.id === parseInt(user_id));

    this.props.dispatch({ type: "USER_TO_EDIT", payload: { user_to_edit: user_to_edit[0] }});
    history.push('/edit_user');
  }

  deleteUserBtn = (e) => {
    let user_id = e.currentTarget.closest(".userlist_item").getAttribute("data-user-id");
    let url = `http://77.120.241.80:8811/api/user/${user_id}`;

    //delete user through api
    axios.delete(url)
      .then(res => {
        console.log("Deleted");
        updateUserList();
      })

      
    const updateUserList = () => {
      axios.get("http://77.120.241.80:8811/api/users")
        .then(res => {
          let temp_arr = res.data.reverse();
          this.props.dispatch({ type: "UPDATE_USERLIST", payload: temp_arr });
        })
    }
  }

  render() {
    let userlist_slice_start = (this.props.userlist_page - 1) * this.props.users_per_page;
    let userlist_slice_end = this.props.userlist_page  * this.props.users_per_page;
    return (
      <Fragment>
        <ul className="userlist">
          {
            this.props.state.userlist
            .slice(userlist_slice_start, userlist_slice_end)
            .map(el => {
              return (
                <li className="userlist_item" key={Math.random()} data-user-id={el.id}>
                  <span className="userlist_username" title={el.desc}>{el.name} {el.surname}</span>
                  <div className="userlist_item_controls">
                    <button className="userlist_item_controls_btn edit_user_btn" onClick={this.handleEditUserBtn}><i className="fas fa-user-edit"></i></button>
                    <button className="userlist_item_controls_btn remove_user_btn" onClick={this.deleteUserBtn}><i className="fas fa-user-times"></i></button>
                  </div>
                </li>
              )
            })
          }
        </ul>

        {/* render pagination onle when userlist isn't empty */}
        { this.props.state.userlist.length > 0 && 
            <UserPagination /> 
        }
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default withRouter(connect(mapStateToProps)(App));