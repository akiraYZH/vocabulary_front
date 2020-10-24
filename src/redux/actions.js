// 用户信息actions
export const UPDATE_USER_INFO = "updateUserInfo";
export const CLEAR_USER_INFO = "clearUserInfo";

export function updateUserInfo(value) {
  return { type: UPDATE_USER_INFO, value };
}

export function clearUserInfo() {
  return { type: CLEAR_USER_INFO };
}

//记单词记录actions
export const UPDATE_TASK = "updateTask";
export const ADD_LEARNED = "addLearned";
export const COMPLETE_TASK = "complete_task";

export function updateTask(value) {
  return { type: UPDATE_TASK, value };
}
export function addLearned(value) {
  return { type: ADD_LEARNED, value };
}
export function completeTask() {
  return { type: COMPLETE_TASK };
}
