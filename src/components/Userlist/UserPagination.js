import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class UserPagination extends Component {
  handlePagination = (e) => {
    e.preventDefault();
    let current_page = +(e.currentTarget.getAttribute("data-page-index"));

    //change userlist page in state
    this.props.dispatch({ type: "CHANGE_USERLIST_PAGE", payload: {
      userlist_pagination: {
        ...this.props.state.userlist_pagination,
        userlist_page: current_page,
      }
    } })
  }

  render() {
    let page_index = 1;
    return (
      <Fragment>
        <ul className="userlist_pagination pagination">
          {
            this.props.state.userlist.map((el, index) => {
              if(this.props.state.userlist_pagination !== undefined && index % this.props.state.userlist_pagination.users_per_page === 0) {
                let item = (
                  <li key={Math.random()} className="page-item">
                    <a className="page-link" onClick={this.handlePagination} data-page-index={page_index} href="http://">{page_index}</a>
                  </li>
                );
                page_index++;
                return item;
              }
            })
          }
        </ul>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(UserPagination);