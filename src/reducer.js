const initialState = {
  userlist: []
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case "UPDATE_USERLIST":
      return {
        ...state,
        userlist: action.payload
      }
    case "USERLIST_PAGINATION":
      return {
        ...state,
        ...action.payload
      }
    case "USER_TO_EDIT":
      return {
        ...state,
        ...action.payload
      }
    case "CHANGE_USERLIST_PAGE":
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}

export default reducer;