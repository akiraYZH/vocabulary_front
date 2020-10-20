import { createStore, combineReducers } from "redux";
import { UPDATE_USER_INFO, CLEAR_USER_INFO } from "./actions";
import reduxDevTool from "../utils/reduxDevTool";

// 用户登陆信息
function userReducer(
  state = {
    userInfo: null,
  },
  action
) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      console.log(action, "action");
      return {
        ...state,
        userInfo: action.value,
      };
    case CLEAR_USER_INFO:
      localStorage.clear();
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
}
let store = createStore(
  userReducer,
  //开启reduxDevTool
  reduxDevTool()
);

export default store;
