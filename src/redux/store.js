import { createStore, combineReducers } from "redux";
import {
  UPDATE_USER_INFO,
  CLEAR_USER_INFO,
  UPDATE_TASK,
  ADD_LEARNED,
  COMPLETE_TASK,
} from "./actions";
import reduxDevTool from "../utils/reduxDevTool";
import _axios from "../utils/_axios";

// 用户登陆信息
function userReducer(
  state = {
    userInfo: null,
  },
  action
) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      // console.log(action, "action");
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
// 记单词进程
function wordsReducer(
  state = {
    learned_arr: [],
    not_learned_arr: [],
    task_completed: 0,
    task_today: [],
  },
  action
) {
  switch (action.type) {
    case UPDATE_TASK:
      console.log(action, "action");
      return {
        ...state,
        task: action.value,
      };
    case ADD_LEARNED:
      state.learned_arr.push(action.value);
      state.not_learned_arr = state.not_learned_arr.filter((word) => {
        return word.id === action.value.id ? false : true;
      });
      return {
        ...state,
      };
    case COMPLETE_TASK:
      return {
        ...state,
        task_complete: 1,
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
