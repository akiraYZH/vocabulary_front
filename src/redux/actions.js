import _axios from "../utils/_axios";

// 用户信息actions
export const UPDATE_USER_INFO = "updateUserInfo";
export const CLEAR_USER_INFO = "clearUserInfo";

export function updateUserInfo(value) {
  return { type: UPDATE_USER_INFO, value };
}

export function clearUserInfo() {
  return { type: CLEAR_USER_INFO };
}
//获得用户信息
export async function getUserInfo() {
  const res = await _axios
    .post("api/users/login-token")
    .then((data) => data.data);
  return res;
}

//记单词记录actions
export const UPDATE_TASK = "updateTask";
export const UPDATE_REVIEW = "update_review";

export function updateTask(value) {
  return { type: UPDATE_TASK, value };
}
export function updateReview(value) {
  return { type: UPDATE_REVIEW, value };
}

//获得用户信息
export async function getWords(id_arr) {
  const res = await _axios
    .post("api/words/get-words", { id_arr })
    .then((data) => data.data);
  return res;
}
