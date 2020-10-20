export const UPDATE_USER_INFO = "updateUserInfo";
export const CLEAR_USER_INFO = "clearUserInfo";

export function updateUserInfo(value) {
  return { type: UPDATE_USER_INFO, value };
}

export function clearUserInfo() {
  return { type: CLEAR_USER_INFO };
}
