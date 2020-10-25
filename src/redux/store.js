import { createStore, combineReducers } from "redux";
import {
  UPDATE_USER_INFO,
  CLEAR_USER_INFO,
  UPDATE_TASK,
  UPDATE_REVIEW,
  getUserInfo,
  getExam,
} from "./actions";
import reduxDevTool from "../utils/reduxDevTool";

// 用户登陆信息reducer
function userReducer(
  state = {
    userInfo: null,
    getUserInfo: getUserInfo,
  },
  action
) {
  switch (action.type) {
    case UPDATE_USER_INFO:
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
// 记单词进程reducer
function wordsReducer(
  state = {
    review_arr: [],
    task_today: [],
    getExam: getExam,
  },
  action
) {
  switch (action.type) {
    case UPDATE_TASK:
      return {
        ...state,
        task_today: action.value,
      };
    case UPDATE_REVIEW:
      return {
        ...state,
        review_arr: action.value,
      };
    default:
      return state;
  }
}

let reducer = combineReducers({ user: userReducer, words: wordsReducer });

let store = createStore(
  reducer,
  //开启reduxDevTool
  reduxDevTool()
);

export default store;
